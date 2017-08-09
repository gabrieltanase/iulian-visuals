'use strict';

angular.module('galleryapp')
    .directive('imageStretcher', function() {

        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element) {
                var elementRatio;

                /**
                 * [calculates the type of crop needed based on the relation between aspect ratios of image and container]
                 * @param  {[number]} containerRatio [a ratio based on width/height of container elements]
                 * @param  {[number]} imgRatio       [a ratio based on width/height of img element]
                 */
                function getCropRatio(containerRatio, imgRatio) {
                    if (containerRatio > 1 && containerRatio < imgRatio || containerRatio <= 1 && (imgRatio > 1 || containerRatio < imgRatio)) {
                        // when container landscape but less wide than image or container portrait but ( img is landscape or container is taller than image)
                        scope.imageCropType = 'crop-width';
                    } else if (containerRatio < 1 && containerRatio > imgRatio || containerRatio >= 1 && (imgRatio < 1 || containerRatio > imgRatio)) {
                        // when container landscape but (wider than image or image is portrait) OR container is portrait but less tall than image
                        scope.imageCropType = 'crop-height';
                    }
                }

                /**
                 * [returns ratio of container]
                 * @param  {[object]} element [targeted element]
                 * @return {[number]}         [ratio of element widt/height]
                 */
                function getContainerRatio(element) {
                    return element[0].clientWidth / element[0].clientHeight;
                }

                /**
                 * [gets dimmensions of the original image by creating a new image obj with the original src,
                 * calculates its aspect ratio, and applies that alongside the container ratio to return the necesary class]
                 * @param  {[string]} imgSrc         [src of original img element]
                 */
                function createImgCalcRatio(imgSrc) {
                    var imageObj = new Image(),
                    imgRatio, containerRatio;
                    imageObj.onload = function() {
                        imageObj.onload = null;
                        imgRatio = imageObj.width / imageObj.height;

                        containerRatio = elementRatio || getContainerRatio(element);

                        getCropRatio(containerRatio, imgRatio);

                        scope.$evalAsync();
                    };
                    imageObj.src = imgSrc;
                }

                /**
                 * [initial crop applied on first digest as DOM loads. After img load, sets calculates class based on img ratio and container ratio]
                 * @param  {[object]} element [target element - our directive element]
                 */
                function initialCrop(element) {
                    var imgElt, imgSrc;

                    scope.imageCropType = '';
                    // if image element is not found then nothing to do
                    imgElt = element.find('img');

                    if (imgElt.length === 0) {
                        return;
                    }

                    // after the image has loaded get it's src
                    imgElt.on('load', function() {
                        imgSrc = imgElt.prop('src');
                        // create an image element to get the original image size
                        createImgCalcRatio(imgSrc);

                        // store ratio to only trigger resize calculation if container is resized
                        elementRatio = getContainerRatio(element);

                        imgElt.off('load');
                    });
                }

                // Initial crop on load
                initialCrop(element);

                // recalculate elements on resize
                angular.element(window).on('resize', function() {
                    var imgOnResize = element.find('img'),
                    imgSrc,
                    newElementRatio = getContainerRatio(element);

                    if (elementRatio === newElementRatio || imgOnResize.length === 0) {
                        return;
                    }

                    elementRatio = newElementRatio; // update ratio for future resizing

                    imgSrc = imgOnResize.prop('src');

                    createImgCalcRatio(imgSrc);
                });
            }
        };
    });
