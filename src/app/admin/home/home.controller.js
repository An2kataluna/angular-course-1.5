import _ from 'underscore';

export default HomeController;

HomeController.$inject = ['BoardsService', 'ProfileService'];

/* @ngInject */
function HomeController(BoardsService, ProfileService) {
    var vm   = this;
    vm.title = 'Home Controller';

    vm.boards = [];

    let userId;
    
    init();

    ////////////////

    function init() {
        userId = ProfileService.getProfile().id;
        BoardsService.getBoards({userId: userId}, successGetBoards, failGetBoards);
    }

    vm.deleteBoard = function (board) {

        if(!board.deleting) {
            board.deleting = true;

            BoardsService.deleteBoard({
                userId: userId,
                boardId: board.id
            }, successDeleteBoard.bind(board), failDeleteBoard.bind(board));
        }
    };

    function successGetBoards(response) {
        vm.boards = response.result;
    }

    function failGetBoards(response) {
        //TODO: Show error
    }

    /***
     * Success callback on deleting a board
     * @context {Object} board that has been deleted
     * @param response
     */
    function successDeleteBoard(response) {

        vm.boards = _.reject(vm.boards, this);
        this.deleting = false;
    }

    function failDeleteBoard(response) {
        //TODO: Show error
        this.deleting = false;
    }

    /***
     * TO DO: complete
     * - show modal to enter Board name
     * - modal must have 2 button - save, cancel
     */
    vm.createBoard = function () {

        var title = prompt("Enter board name: ");

        var newBoard = {
            name: title,
            userId: userId
        };

        BoardsService.createBoard(newBoard,
            function success(response) {
                console.log(response.result);
                BoardsService.getBoards({userId: userId}, successGetBoards, failGetBoards);
            }, function error(response) {
                //TODO: error
            }
        )
    };
    
    
}

