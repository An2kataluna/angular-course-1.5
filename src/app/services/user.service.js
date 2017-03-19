/***
 * User service
 * + log in user
 * + register new user
 **/

UserService.$inject = ['$resource', 'API_URL'];

function UserService ($resource, API_URL){

    var URL = API_URL +  ':action';
    console.log(URL);
    var defaultParams = {
        action: '@action'
    };

    return $resource(URL, defaultParams, {

        getAllUsers: {
            method: 'GET',
            params: {
                action: 'users'
            },
            isArray: false
        },
        
        registerUser: {
            method: 'POST',
            params: {
                action: 'users'
            },
            isArray: false
        }
    });
}

export default UserService;