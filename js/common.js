$(document).ready(function () {
	new WOW().init();
	let mix = $('.mix-option')[0]
	let color = $('.color-option')[0]
	let lenght = $('.lenght-option')[0]
	$('.mix-option').remove()
	$('.color-option').remove()
	$('.lenght-option').remove()
	$('.block-option').on( "click", function() {
		$('.product-options')[0].style.display = 'block'
	});
	$('.mix-block').on( "click", function() {
  		$('.product-options').append(mix)
  		$('.product-select').on( "click", function() {
  			product_select(this)
  		});
	});
	$('.lenght-block').on( "click", function() {
	 	$('.product-options').append(lenght)
	 	$('.product-select').on( "click", function() {
	 		product_select(this)
	 	});
	});
	$('.color-block').on( "click", function() {
	 	$('.product-options').append(color)
	 	$('.product-select').on( "click", function() {
	 		product_select(this)
	 	});
	});
	$('.product-block').not('.product-disabled').on( "click", function() {
		$('.product-slider').remove()

		$('.slider-wrap').append('<div class="product-slider"></div>')
		$('.btn-product').remove()
		$('.btn-option').remove()
		let data = this.dataset.rel;
  		let name = this.children[1].textContent
  		let price = this.children[3].children[0].textContent
  		let img_arr = this.dataset.img.split(',')
  		for (let i = img_arr.length - 1; i >= 0; i--) {
  			$('.product-slider').append('<div class="product-slide"> <img src="'+img_arr[i]+'" alt=""> </div>');
  		}
  		$('.product-slider')[0].classList.add('slider-prod')
  		$('.slider-prod').not('.slick-initialized').slick({
  			arrows: true,
  			prevArrow: $('.arrow-prev'),
  			nextArrow: $('.arrow-next')
  		})
  		let input = $('input')[0]
  		let counter = 0
  		input.value = '1'
  		$('.product-info').append('<a href="#" class="btn-ens-action btn-product">В корзину</a>');
  		let button = $('.btn-product')[0]
  		input.dataset.rel = data
  		button.dataset.rel = data
  		$('.modal-window')[0].style.opacity = '1';
  		$('.dark-window')[0].style.opacity = '0.1';
  		$('.modal-window')[0].style.zIndex = '999999999';
  		$('.dark-window')[0].style.zIndex = '999999';
  		$('.product-name')[0].innerHTML = name
  		$('.btn-product').unbind('click');
  		if (this.classList.contains('block-option')) {
  			counter = 3
  		}
  		else{
  			counter = 2
  		}
  		
		$('.btn-product').on( "click", function() {
			$(".basket-list").append('<span class="basket-item">'+ name + price +'</span>');
			if (counter <= parseInt(input.value)) {
				while (counter <= parseInt(input.value)) {	
					counter ++
					$('.btn-product').click()
				}
			}
			else{
				if ($('.product-options').css('display') != 'none') {
					if (counter != 3 || parseInt(input.value) == 2) {
						$('.footer').append('<a href="#" class="btn-ens-action btn-option">Купить</a>');
						$('.btn-option')[0].dataset.detail = get_option()
						$('.btn-option')[0].dataset.rel = data
						$('.btn-option')[0].click()
						$(".basket-list").append('<span class="basket-item">'+ name + price +'</span>');
						$('.modal-window')[0].style.opacity = '0';
						$('.dark-window')[0].style.opacity = '0';
						$('.modal-window')[0].style.zIndex = '-9999';
						$('.dark-window')[0].style.zIndex = '-9999';
						$('.product-options')[0].style.display = 'none'
						$('.mix-option').remove()
						$('.color-option').remove()
						$('.lenght-option').remove()
					}
					else{
						button.dataset.detail = get_option()
						button.dataset.rel = data
						
						$('.modal-window')[0].style.opacity = '0';
						$('.dark-window')[0].style.opacity = '0';
						$('.modal-window')[0].style.zIndex = '-9999';
						$('.dark-window')[0].style.zIndex = '-9999';
						$('.product-options')[0].style.display = 'none'
						$('.mix-option').remove()
						$('.color-option').remove()
						$('.lenght-option').remove()
					}
				}
				else{
					$('.modal-window')[0].style.opacity = '0';
					$('.dark-window')[0].style.opacity = '0';
					$('.modal-window')[0].style.zIndex = '-9999';
					$('.dark-window')[0].style.zIndex = '-9999';
					$('.product-options')[0].style.display = 'none'
					$('.mix-option').remove()
					$('.color-option').remove()
					$('.lenght-option').remove()
				}	
			}		
		});
	});
	$('.modal-exit').on( "click", function() {
  		$('.modal-window')[0].style.opacity = '0';
  		$('.dark-window')[0].style.opacity = '0';
  		$('.modal-window')[0].style.zIndex = '-9999';
  		$('.dark-window')[0].style.zIndex = '-9999';
  		$('.product-options')[0].style.display = 'none'
  		$('.mix-option').remove()
  		$('.color-option').remove()
  		$('.lenght-option').remove()
  		return false;
	});
	$('.dark-window').on( "click", function() {
  		$('.modal-window')[0].style.opacity = '0';
  		$('.dark-window')[0].style.opacity = '0';
  		$('.modal-window')[0].style.zIndex = '-9999';
  		$('.dark-window')[0].style.zIndex = '-9999';
  		$('.product-options')[0].style.display = 'none'
  		$('.mix-option').remove()
  		$('.color-option').remove()
  		$('.lenght-option').remove()
	});
	
	$('.go_to').click(function () {
	   var scroll_el = $(this).attr('href'); 
	   if ($(scroll_el).length != 0) { 
	      $('html, body').animate({
	         scrollTop: $(scroll_el).offset().top -50
	      }, 900); 
	   }
	   return false; 
	});
	$('.product-help').on( "click", function() {
		$(this).toggleClass('help-active')
		let help_text = this.parentElement.children[1]
		if (this.classList.contains('help-active')) {
			help_text.style.opacity = '1';
			help_text.style.zIndex = '9999';
		}
		else{
			help_text.style.opacity = '0';
			help_text.style.zIndex = '-999999';
		}
	});
	$('.product-select').on( "click", function() {
		product_select(this)
	});
	function product_select(element) {
		let parent = element.parentElement.children
		for (let i = parent.length - 1; i >= 0; i--) {
			if (parent[i] != element) {
				parent[i].classList.remove('select-active');
			}
			else{
				parent[i].classList.add('select-active');
			}
		}
	}
	function get_option() {
		let options = []
		let all_optins = $('.product-option')
		for (let i = all_optins.length - 1; i >= 0; i--) {
			let wrapper = all_optins[i].children[1].children
			let name = all_optins[i].children[0].children[0]
			name = $(name).text() + ':'
			let select_option = null;
			for (let i = 0; i < wrapper.length; i++) {
				if (wrapper[i].classList.contains('select-active')) {
					select_option = wrapper[i].textContent
				}
			}
			options.push(name,select_option)
		}
		options = options.join("")
		options = options.replace(/\r?\n/g, "")
		return options;
	}
	$('.minus-quant').on( "click", function() {
		let rel = $('.minus-quant')[0].dataset.rel
  		let input = $('input')[0]
  		if (input.value > 1) {
  			input.value = input.value - 1
  		}
	});
	$('.plus-quant').on( "click", function() {
  		let rel = $('.plus-quant')[0].dataset.rel
  		let input = $('input')[0]
  		input.value = parseInt(input.value) + 1
	});
	$('.header-slider').slick({
	   arrows: true,
	   prevArrow: $('.header-prev'),
	   nextArrow: $('.header-next'),
	   dots: true,
	});
	
	$('.navbar-block').on( "click", function() {
  		for (var i = $('.navbar-block').length - 1; i >= 0; i--) {
  			if ($('.navbar-block')[i] != this) {
  				$('.navbar-block')[i].classList.remove('block-active');
  			}
  			else{
  				$('.navbar-block')[i].classList.add('block-active');
  			}
  		}
	});
	$(".tab_item").not(":first").hide();
	$(".navbar-wrapper .tab").click(function() {
	    $(".navbar-wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
	    $(".tab_item").hide().eq($(this).index()).fadeIn(1300)
	}).eq(0).addClass("active");
});