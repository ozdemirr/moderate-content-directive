angular.module('moderateContent', [])
    .provider('moderateContentConfig', function () {

        this.censored = false;
        this.fallback = false;

        this.setCensored = function (censored) {
            this.censored = censored;
        };

        this.setFallback = function (fallback) {
            this.fallback = fallback;
        };

        this.$get = function () {
            return this;
        };

    })
    .directive('moderateContent', function (moderateContentConfig,$http) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $http({
                    method : "GET",
                    url : 'https://www.moderatecontent.com/api/?url=' + attrs.moderateContent
                }).then(function(data) {
                    var response = data.data;
                    //image was processed on moderatecontent successfully
                    if(response.error_code == 0){
                        //filters were set, we can make decision
                        if(angular.isDefined(attrs.moderateFilters) && attrs.moderateFilters != ""){
                            var filtersArray = attrs.moderateFilters.split(',');
                            if(filtersArray.indexOf(response.rating_letter) > -1){
                                //we should censor it!
                                angular.element(element).attr("src", moderateContentConfig.censored);
                            }else{
                                //no censor
                                angular.element(element).attr("src", attrs.moderateContent);
                            }
                        }else{
                            angular.element(element).attr("src", attrs.moderateContent);
                            console.log('there is no moderate filter');
                        }
                    }else{
                        //image was not processed on moderatecontent so show it without decision
                        if(moderateContentConfig.fallback){
                            angular.element(element).attr("src", attrs.moderateContent);
                        }
                    }
                }, function (response) {
                    console.log('server issue');
                    if(moderateContentConfig.fallback){
                        //server deals with some issues so show it without decision
                        angular.element(element).attr("src", attrs.moderateContent);
                    }
                });
            }
        };
});