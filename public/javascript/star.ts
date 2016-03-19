/**
 * Demo in action!
 */
$(function() {
    'use strict';
    // SHOP ELEMENT
    var shop = document.querySelector('#shop');
    // DUMMY DATA
    var data = [
        {
            title: "Dope Hat",
            description: "Dope hat dolor sit amet, consectetur adipisicing elit. Commodi consectetur similique ullam natus ut debitis praesentium.",
            rating: 3
        },
        {
            title: "Hot Top",
            description: "Hot top dolor sit amet, consectetur adipisicing elit. Commodi consectetur similique ullam natus ut debitis praesentium.",
            rating: 2
        },
        {
            title: "Fresh Kicks",
            description: "Fresh kicks dolor sit amet, consectetur adipisicing elit. Commodi consectetur similique ullam natus ut debitis praesentium.",
            rating: null
        }
    ];
    // INITIALIZE
    (function init() {
        for (var i = 0; i < data.length; i++) {
            addRatingWidget(buildShopItem(data[i]), data[i]);
        }
    })();
    // BUILD SHOP ITEM
    function buildShopItem(data) {
        var shopItem = document.createElement('div');
        var html = '<div class="c-shop-item__img"></div>' +
                '<div class="c-shop-item__details">' +
                '<h3 class="c-shop-item__title">' + data.title + '</h3>' +
                '<p class="c-shop-item__description">' + data.description + '</p>' +
                '<ul class="c-rating"></ul>' +
                '</div>';
        shopItem.classList.add('c-shop-item');
        shopItem.innerHTML = html;
        shop.appendChild(shopItem);
        return shopItem;
    }
    // ADD RATING WIDGET
    function addRatingWidget(shopItem, data) {
        var ratingElement = shopItem.querySelector('.c-rating');
        var currentRating = data.rating;
        var maxRating = 5;
        var callback = function(rating) { alert(rating); };
        var r = rating(ratingElement, currentRating, maxRating, callback);
    }
});
