$(function(){

	var $vid = $('#vid'),
			$tagList = $('.tag-list'),
			tagMode = false,
			tags = [];

	var video = $vid.find('video')[0];


	// Tag mode toggle
	// ================================================
	$('.tag-button').on('click', function(){
		$('body').toggleClass('tag-mode');
		tagMode = tagMode ? false : true;

		if(tagMode){
			video.pause();
		} else {
			video.play();
			// Clear taggables
			$('.taggables').html('');
		}
	});

	// Tagging
	// ================================================
	$(document).on('click', '.tag-mode #vid', function(e){
		var tagBox = $('<span class="tag-box"></span>'),
				tagItem = $('<li />');
				$this = $(this),
				$video = $this.find('video'),
				videoTime = $video[0].currentTime,
				mouseX = e.pageX - $this.offset().left,
				mouseY = e.pageY - $this.offset().top;

		// Calculate % position
		mouseX = (mouseX / $video.width()) * 100;
		mouseY = (mouseY / $video.height()) * 100;
		
		// Set box position
		tagBox.css({
			left: mouseX + '%',
			top: mouseY + '%'
		});

		// Add tag to the tag Object
		tags.push({
			name: "Sawyer Hollenshead", // TODO
			time: videoTime,
			x: mouseX,
			y: mouseY
		});

		// Add tag to visible list
		tagItem.html(videoTime + " - Sawyer Hollenshead").data('time', videoTime).data('x', mouseX).data('y', mouseY);
		$tagList.append(tagItem);

		console.log(tags);

		// Append tag box to video container
		$this.find('.taggables').append(tagBox);

	});

	// Seeking by tag
	// ================================================
	$tagList.on('click', 'li', function(){
		$('.tagged').html('');
    var $this = $(this);
    var time = $this.data('time');
    var x = $this.data('x');
    var y = $this.data('y');
    var tagBox = $('<span class="tag-box"></span>');

    // Set box position
		tagBox.css({
			left: x + '%',
			top: y + '%'
		});

		video.currentTime = time;
		video.pause();

		console.log(video.currentTime);

    $('.tagged').append(tagBox);
	});

});