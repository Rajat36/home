// const http = require('http')

// const server = http.createServer((req,res)=>{
//     res.end('Hello from the server')
// })

// server.listen(8000, '127.0.0.1',()=>{
//     console.log('the server is started on port 8000');
// })



const fs = require('fs');
const http = require('http');
const { dirname } = require('path');
const url = require('url');





// SERVER

function replaceTemplate(temp,product) {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)

  if(!product.organic){ output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic') }

  return output;

}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html` , 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html` , 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html` , 'utf-8');

  const dataObj = JSON.parse(data)

const server = http.createServer((req, res)=> {


    // console.log(req.url);
    // console.log(url.parse(req.url,true));

    const { query, pathname } = url.parse(req.url,true);
    // pathName = req.url;
    
    // Overview Page
    if(pathname === '/' || pathname === '/overview') {  

      res.writeHead(200, {
        'Content-type': 'text/html'
      })

      const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('') 
      // console.log(cardsHtml);

      const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)

        res.end(output);
        // res.end(tempOverview);


        // Product Page 
     }else if(pathname === '/product') {   
      
      res.writeHead(200, {
        'Content-type': 'text/html'
      })
 
      const product = dataObj[query.id]
        // res.end('Welcome to the product');
      const output = replaceTemplate(tempProduct, product)

      res.end(output)


        // API 
     }else if(pathname == '/api') {  
      
      
        res.writeHead(200, {
          'Content-type': 'application/json'
        })
        res.end(data);
  


  //  Not Found
   }else{
        res.end('<h1>Page Not Found!!</h1>');
     }

})


server.listen(3000,()=>{
    console.log('Server running at http://127.0.0.1:3000');
})