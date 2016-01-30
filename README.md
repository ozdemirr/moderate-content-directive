# moderate-content-directive
AngularJS Image Directive for moderatecontent.com 

Description:

https://www.moderatecontent.com provides a content rating for any image and it's free. I just made a directive for img element.
If you put image link into moderate-content attribute, the image's link will be posted to moderatecontent.com, and the result will be handled for your moderate-filters

Example ;

//<img moderate-content="{{image}}" moderate-filters="a,t">

Filters;

a : adult
t : teen
e : everyone

Install;

- include moderateContent.js
- add moderateContent module to your main module
- configure;

app.config(function (moderateContentConfigProvider) {
    //if the image should be censored, this image will be replaced with it.
    moderateContentConfigProvider.setCensored('censored.jpg');
    //if something goes wrong, the original image should be shown ?
    moderateContentConfigProvider.setFallback(true);
  });
  
  