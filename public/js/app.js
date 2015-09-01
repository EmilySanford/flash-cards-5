var app = angular.module('flashCards', ['ui.router']);

app.value('currentFlashCards', []);


app.config(function($stateProvider){
	$stateProvider
	.state('stats', {
		url: '/stats',
		templateUrl: '/js/templates/stats.html',
		controller: 'StatsController'
	})
	.state('newCard', {
		url: '/new-card',
		templateUrl: '/js/templates/new-card.html',
		controller: 'NewCardController'
	})
	.state('all', {
		url: '/all',
		templateUrl: '/js/templates/all.html',
		controller: 'MainController'

	})
	.state('manage',{
		url: '/manage/:id',
		templateUrl: '/js/templates/manage.html',
		controller: function($scope, theCard){
			$scope.card = theCard;
		}, 
		resolve: {
			theCard: function($stateParams, FlashCardsFactory){
				return FlashCardsFactory.getCardById($stateParams.id);
			}
		}
	})
	.state('manage.edit', {
		url: '/edit',
		templateUrl: 'js/templates/manage.edit.html',
		controller: 'EditCardController'
	})
	.state('manage.delete', {
		url: '/delete',
		templateUrl: '/js/templates/manage.delete.html',
		controller: function($scope, FlashCardsFactory){
			$scope.remove = function(){
				FlashCardsFactory.removeById($scope.card._id)
				.then(function(){
					$state.go('all');
				});
			};
			$scope.cancelRemove = function(){
				$state.go('manage', {id: $scope.card._id})
			};
		}
	})
});