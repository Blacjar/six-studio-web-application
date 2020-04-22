// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const path = require('path')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const secretKey = '6Lft5OoUAAAAAO48HrCd-_BOYyaaw5yZn-DnG3Df'

const config = {
	views: 'views', 	// Set views directory
	static: 'public', // Set static assets directory
	logging: true,
	db: vertex.nedbConfig((process.env.TURBO_ENV=='dev') ? 'nedb://'+path.join(__dirname, process.env.TMP_DIR) : 'nedb://'+process.env.TMP_DIR)
}

const app = vertex.app(config) // initialize app with config options
app.use(vertex.setContext(process.env)) // set CDN and global object on 'req.config' and 'req.site' object
app.use(helmet())



// import routes
const page = require('./routes/page')
const main = require('./routes/main')
const vertexRouters = require('./routes/vertex')


//app.use('/', page)
app.use('/', main)
app.use('/api', vertexRouters.api)
app.use('/blocks', vertexRouters.blocks)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/api/subscriber',(req,res)=>{

    if(!req.body.captcha){
        console.log("err");
        return res.json({"success":false, "msg":"Capctha is not checked"});
       
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

    request(verifyUrl,(err,response,body)=>{

        if(err){console.log(err); }

        body = JSON.parse(body);

        if(!body.success && body.success === undefined){
            return res.json({"success":false, "msg":"captcha verification failed"});
        }
        else if(body.score < 0.5){
            return res.json({"success":false, "msg":"you might be a bot, sorry!"});
        }
        
            // return json message or continue with your function. Example: loading new page, ect
            return res.json({"success":true, "msg":"Message sent successfully"});

    })

});


module.exports = app

