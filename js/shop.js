var base_frontend_url = 'https://lk.easynetshop.ru/frontend/v5/frontend.php';
var base_cache_url = 'https://lk.easynetshop.ru/frontend/v5/cache.php';

if (ens_jQuery == undefined) {var ens_jQuery = jQuery;}

if (ens_no_image == undefined) // Если своя заглушка не определена для кросс-товаров, используем страндартную 
	{
        var ens_no_image = 'https://image.ibb.co/hk3DsU/no_image.jpg';
	}

if (ens_lang != undefined) 
	{
	if (ens_lang == 'en') { base_frontend_url = base_frontend_url+'?l=en'; }
	if (ens_lang == 'ua') { base_frontend_url = base_frontend_url+'?l=ua';}
	}
else {  var ens_lang = 'ru'; 	}

var ens_error_load_goodslist = 'Ошибка загрузки списка товаров. Попробуйте, пожалуйста, позже или сообщите об этом администрации сайта';
var ens_nomore = 'Товара нет в наличии';

ens_jQuery(document).ready(function() {

    if (window['EasyNetShop'] == undefined) {
        window['EasyNetShop'] = 'EasyNetShop';
        ens_jQuery('body').append('<div class="easynetshop-modalcontainer">' +
            '<div class="easynetshop-modal easynetshop-modal-addtocart"><div class="easynetshop-modal-header"><button type="button" class="easynetshop-close">×</button><span class="easynetshop-modal-title easynetshop-modal-caption">Товар добавлен в корзину</span></div><div class="easynetshop-modal-body easynetshop-center"><button type="button" class="easynetshop-continue">Вернуться на сайт</button><button type="button" class="easynetshop-gotocart">Оформить заказ</button><br></div><div class="easynetshop-recomended"></div><div class="easynetshop-footer"></div></div>' +
            '<div class="easynetshop-modal easynetshop-modal-cart"><div class="easynetshop-modal-header"><button type="button" class="easynetshop-close">×</button><span class="easynetshop-modal-title easynetshop-modal-caption">Оформление заказа</span></div><div class="easynetshop-modal-body"></div><div class="easynetshop-recomended"></div><div class="easynetshop-footer"><button type="button" class="easynetshop-continue">Вернуться на сайт</button> <button type="button" class="easynetshop-doorder">Заказать</button><br><span class="powered"><span class="powered-append">Работает на </span><a href="https://easynetshop.ru/?utm_source=partners&utm_medium=referral" target="_blank">EasyNetShop.ru</a></a></span></div></div>' +
            '<div class="easynetshop-modal easynetshop-modal-ordercompleate"><div class="easynetshop-modal-header"><button type="button" class="easynetshop-close">×</button><span class="easynetshop-modal-title easynetshop-modal-caption">Заказ оформлен</span></div><div class="easynetshop-modal-body"><br></div><div class="easynetshop-center  easynetshop-ok"><button type="button" class="easynetshop-continue">Вернуться на сайт</button><button type="button" class="easynetshop-returntocart">Вернуться к заказу</button><br><br></div></div>' +
            '<div class="easynetshop-modal easynetshop-modal-cartempty"><div class="easynetshop-modal-header"><button type="button" class="easynetshop-close">×</button><span class="easynetshop-modal-title  easynetshop-modal-caption">Ваша корзина пуста</span></div><div class="easynetshop-modal-body">Пока ничего не выбрано!</div><div class="easynetshop-footer"><div class="easynetshop-center  easynetshop-ok"><button type="button" class="easynetshop-continue">Вернуться на сайт</button></div></div></div>' +
            '<div class="easynetshop-modal easynetshop-modal-leavepopup"><div class="easynetshop-modal-header"><button type="button" class="easynetshop-close">×</button><span class="easynetshop-modal-title  easynetshop-modal-caption">Внимание!</span></div><div class="easynetshop-modal-body">---</div><div class="easynetshop-center"><button type="button" class="easynetshop-continue">Вернуться на сайт</button> <button type="button" class="easynetshop-gotocart">Оформить заказ</button><br><span class="powered"><span class="powered-append">Работает на</span> <a href="https://easynetshop.ru/?utm_source=partners&utm_medium=referral" target="_blank">EasyNetShop.ru</a></a></span><br><br></div></div></div>' +
            '<div class="easynetshop-loader"><svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"> <path fill="#666" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform          attributeName="transform"          attributeType="XML"          type="rotate"         dur="2s"          from="0 50 50"         to="-360 50 50"          repeatCount="indefinite" />  </path> <path fill="#666" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform          attributeName="transform"          attributeType="XML"          type="rotate"         dur="1s"          from="0 50 50"         to="-360 50 50"          repeatCount="indefinite" />  </path> <path fill="#666" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform          attributeName="transform"          attributeType="XML"          type="rotate"         dur="2s"          from="0 50 50"         to="360 50 50"          repeatCount="indefinite" />  </path></svg></div>');
        ens_jQuery('body').append('<div class="easynetshop-modal-fade-wrapper"></div>');

        if (ens_jQuery('#easynetshop-cart').html() == undefined)
            ens_jQuery('body').append('<div id="easynetshop-cart-default"><div id="enscart_wrapper"><div id="enscart_image_wrapper">	<svg id="enscart_image" width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">	 <g display="inline">	  <line stroke="#ffffff" stroke-linecap="round" id="svg_1" y2="4.48005" x2="8.56256" y1="4.48005" x1="1.90565" stroke-width="2" fill="none"/>	  <line stroke="#ffffff" stroke-linecap="round" id="svg_2" y2="26.81217" x2="14.00349" y1="5.01899" x1="8.62595" stroke-width="2" fill="none"/>	  <line stroke="#ffffff" id="svg_4" y2="26.30272" x2="32.88148" y1="26.16121" x1="14.1167" stroke-linecap="round" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>	  <line stroke="#ffffff" id="svg_5" y2="26.30272" x2="32.99469" y1="10.73616" x1="37.94769" stroke-linecap="round" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>	  <line stroke="#ffffff" id="svg_6" y2="10.31162" x2="9.92788" y1="10.31162" x1="38.03889" stroke-linecap="round" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>	  <line stroke="#ffffff" id="svg_7" y2="15.49104" x2="35.79708" y1="15.49104" x1="11.03169" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>	  <line stroke="#ffffff" id="svg_8" y2="21.05161" x2="34.24375" y1="21.05161" x1="12.3638" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>	  <line stroke="#ffffff" id="svg_9" y2="31.48214" x2="29.40023" y1="31.48214" x1="11.59775" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>	  <ellipse stroke="#ffffff" ry="2.33498" rx="2.33498" id="svg_10" cy="33.81084" cx="11.94839" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>	  <ellipse stroke="#ffffff" id="svg_11" ry="2.33498" rx="2.33498" cy="33.75423" cx="30.28391" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>	  <line stroke="#ffffff" id="svg_12" y2="31.57648" x2="11.80216" y1="26.30901" x1="14.33369" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" fill="none"/>	  <line transform="rotate(17.595947265625 30.324157714843736,17.913986206054684) " stroke="#ffffff" id="svg_15" y2="25.98805" x2="30.32416" y1="9.83992" x1="30.32416" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>	  <line stroke="#ffffff" fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" opacity="0.5" x1="9.77064" y1="1.5" x2="9.77064" y2="1.5" id="svg_3"/>	  <line stroke="#ffffff" fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" opacity="0.5" x1="11.41221" y1="7.5002" x2="11.41221" y2="7.5002" id="svg_13"/>	  <line	stroke="#ffffff" fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" opacity="0.5" x1="17.97846" y1="8.85874" x2="17.97846" y2="8.85874" id="svg_14"/>	  <line	stroke="#ffffff" fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" opacity="0.5" x1="33.09218" y1="8.80213" x2="33.09218" y2="8.80213" id="svg_19"/>	  <line stroke="#ffffff" fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" opacity="0.5" x1="16.84635" y1="10.61351" x2="16.84635" y2="10.61351" id="svg_20"/>	  <line id="svg_17" transform="rotate(17.595947265625 24.99999809265135,18.25) " stroke="#ffffff" y2="26.32406" x2="25" y1="10.17594" x1="25" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>	  <line id="svg_18" transform="rotate(17.595947265625 19.499998092651342,17.950000762939453) " stroke="#ffffff" y2="26.02406" x2="19.5" y1="9.87594" x1="19.5" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>	  <line stroke="#ffffff" id="svg_21" transform="rotate(17.595947265625 14.89651870727539,15.453754425048826) " y2="21.22377" x2="14.89652" y1="9.68374" x1="14.89652" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" fill="none"/>	 </g>	</svg> 	</div><div id="enscart_counter">0</div></div></div>');

        ens_jQuery('.easynetshop-continue').click(function() {
            hideEasynetshopModals();
            return false;
        });

        ens_jQuery('.easynetshop-returntocart').click(function() {
            hideEasynetshopModals();
            getEasynetshopCart();
            return false;
        });

        ens_jQuery('.easynetshop-close').click(function() {
            hideEasynetshopModals();
            return false;
        });

        ens_jQuery('.easynetshop-gotocart').click(function() {
            getEasynetshopCart();
            return false;
        });

        ens_jQuery('#easynetshop-cart').click(function() {
            getEasynetshopCart();
            return false;
        });
        ens_jQuery('#easynetshop-cart-default').click(function() {
            getEasynetshopCart();
            return false;
        });
        $selected_delivery = 0;

        //ecommerce
        window.dataLayer = window.dataLayer || [];
        if (typeof gtag !== 'undefined') gtag('require', 'ecommerce');
        goods_in_page_ids = [];
        ecommerce_data = [];
        ecommerce_currency = 'RUB';
        ens_jQuery('.btn-ens-action, .easynetshop-buy').each(function() {
            goods_in_page_ids[goods_in_page_ids.length] = ens_jQuery(this).data('rel');
        });
        if (goods_in_page_ids.length > 0 && typeof easynetshop_productscommerce != 'undefined') {
            ens_jQuery.ajax({
                    method: "POST",
                    url: base_frontend_url,
                    data: {
                        action: "getproductscommerce",
                        ids: goods_in_page_ids
                    },
                    dataType: 'json',
                    cache: false,
                    xhrFields: {
                        withCredentials: false
                    },
                    headers: {
                        "X-COOKIE": getEasynetshopCookie()
                    },
                    crossDomain: true,
                    success: function(output, status, xhr) {
                        var sess_id = xhr.getResponseHeader("X-COOKIE");
                        if (sess_id != '') updateEasynetshopCookie(sess_id);
                    }
                })
                .done(function(msg, status, xhr) {
                    ecommerce_data = msg.goods;
                    ecommerce_currency = msg.currency;
                    data = {
                        "ecommerce": {
                            "currencyCode": ecommerce_currency,
                            "detail": {
                                "products": msg['goods']
                            }
                        }
                    };
                    dataLayer.push(data);
                });
        }
        //

	ens_jQuery("body").on('click','.btn-ens-action',function () {

            easynetshop_buy(ens_jQuery(this).data('rel'),ens_jQuery(this).data('detail'));
		
            return false;
        });
        ens_jQuery("body").on('click','.easynetshop-buy',function () {
            easynetshop_buy(ens_jQuery(this).attr('rel'));
            return false;
        });
    	ens_jQuery('body').on('change', '.ens-select', function () {
      		var selected_rel = ens_jQuery(this).find('option:selected').data('rel');
      		if (selected_rel != undefined){
        		if (selected_rel != ''){
            			easynetshop_buy(selected_rel);
            		}
        	}
      	ens_jQuery(this).find('option').attr("selected",false) ;
    	});
        

        ens_jQuery('.easynetshop-doorder').click(function() {

	    var $errorcount = 0;
            ens_jQuery('.easynetshop-required').each(function() {
	    if (ens_jQuery(this).val() == '')
		{
		ens_jQuery(this).addClass( "easynetshop-required-error" );
		$errorcount++;
		}
  	    else {
                ens_jQuery(this).removeClass( "easynetshop-required-error" );
		}
	    });
            ens_jQuery('.easynetshop-required[name=email]').each(function() {
		var emailpattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,9}\.)?[a-z]{2,9}$/i;
		if(emailpattern.test(ens_jQuery(this).val())){
			ens_jQuery(this).removeClass( "easynetshop-required-error" );
		}
		else {
		ens_jQuery(this).addClass( "easynetshop-required-error" );
                $errorcount++;
		}
	    });
            ens_jQuery('.easynetshop-deliveryoptions  option:selected').each(function() {
		if (ens_jQuery(this).val() == '0')
			{
               		$errorcount++;
			ens_jQuery(this).parent().addClass( "easynetshop-required-error" );
			}
		else	{
			ens_jQuery(this).parent().removeClass( "easynetshop-required-error" );
			}

		    });
	

            console.log($errorcount);
	    if ($errorcount>0) {throw '';}
		

            ens_jQuery('.easynetshop-modal-errortext').remove();
            ens_jQuery('.easynetshop-modal-cart input[name="email"]').removeClass('easynetshop-modal-cart-error');
            ens_jQuery('.easynetshop-modal-cart input[name="phone"]').removeClass('easynetshop-modal-cart-error');

            hideEasynetshopModals();
            ens_jQuery('.easynetshop-loader').show();

            //ecommerce
            ecommerce_cart_data = [];
            if(typeof easynetshop_productscommerce != 'undefined') ens_jQuery.ajax({
                    method: "POST",
                    url: base_frontend_url,
                    data: {
                        action: "getcartcommerce"
                    },
                    dataType: 'json',
                    cache: false,
                    xhrFields: {
                        withCredentials: false
                    },
                    headers: {
                        "X-COOKIE": getEasynetshopCookie()
                    },
                    crossDomain: true,
                    success: function(output, status, xhr) {
                        var sess_id = xhr.getResponseHeader("X-COOKIE");
                        if (sess_id != '') updateEasynetshopCookie(sess_id);
                    }
                })
                .done(function(msg) {
                    ecommerce_cart_data = {
                        "ecommerce": {
                            "currencyCode": ecommerce_currency,
                            "purchase": {
                                "actionField": {
                                    "id": Math.floor(Math.random() * (1000000 - 1 + 1)) + 1
                                },
                                "products": msg
                            }
                        }
                    };

	


                    if (typeof gtag !== 'undefined') {
                        full_price = 0;
                        for (i = 0; i < ecommerce_cart_data.ecommerce.purchase.products.length; i++)
                            full_price += ecommerce_cart_data.ecommerce.purchase.products[i].price * ecommerce_cart_data.ecommerce.purchase.products[i].quantity;
                        gtag('event', 'purchase', {
                            'transaction_id': ecommerce_cart_data.ecommerce.purchase.actionField.id,
                            'affiliation': 'EasyNetShop',
                            'value': full_price,
                            'currency': ecommerce_currency
                        });
                    }
                });
            //
            var custom_fields = [];
            jQuery.ajaxSettings.traditional = false;
            
            ens_jQuery('.easynetshop-customfield').each(function() {
                custom_fields[custom_fields.length] = {
                    name: ens_jQuery(this).attr('name'),
                    value: ens_jQuery(this).val()
                }
            });
            var ensp = '';
            var ename = 'ensp';
            var ematches = document.cookie.match(new RegExp("(?:^|; )" + ename.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            if (ematches != undefined) ensp = decodeURIComponent(ematches[1]);

            ens_jQuery.ajax({
                    method: "POST",
                    url: base_frontend_url,
                    data: {
                        action: "doorder",
                        phone: ens_jQuery('.easynetshop-modal-cart input[name="phone"]').val(),
                        email: ens_jQuery('.easynetshop-modal-cart input[name="email"]').val(),
                        comment: ens_jQuery('.easynetshop-modal-cart textarea[name="comment"]').val(),
                        custom_fields: custom_fields,
                        delivery: ens_jQuery('.easynetshop-modal-cart select[name="delivery"]').val(),
                        ensp: ensp
                    },
                    dataType: 'text',
                    cache: false,
                    xhrFields: {
                        withCredentials: false
                    },
                    headers: {
                        "X-COOKIE": getEasynetshopCookie()
                    },
                    crossDomain: true,
                    success: function(output, status, xhr) {
                        var sess_id = xhr.getResponseHeader("X-COOKIE");
                        if (sess_id != '') updateEasynetshopCookie(sess_id);
                    }
                })
                .done(function(msg) {
                    updateEasynetshopCart();
                    ens_jQuery('.easynetshop-loader').hide();
                    if (msg.substring(0, 2) == 'OK') {
                        if(typeof easynetshop_productscommerce != 'undefined') 
				{
				 dataLayer.push(ecommerce_cart_data);
	
				}
                        if (typeof gtag !== 'undefined')
                            gtag('ecommerce:send');
                        ens_jQuery('.easynetshop-modal-ordercompleate .easynetshop-modal-body').html(msg.substring(2));
                        ens_jQuery('.easynetshop-continue').show();
                        ens_jQuery('.easynetshop-returntocart').hide();
                    } else {
                        ens_jQuery('.easynetshop-modal-ordercompleate .easynetshop-modal-body').html(msg);
                        ens_jQuery('.easynetshop-continue').hide();
                        ens_jQuery('.easynetshop-returntocart').show();
                    }
                    ens_jQuery('.easynetshop-modal-fade-wrapper').show();
                    ens_jQuery('.easynetshop-modal-ordercompleate').show();
                    ens_jQuery('.easynetshop-modalcontainer').show();
                    ens_jQuery('body').addClass('easynetshop-bodyhide');
                    var eventmo = null;
                    try {
                        eventmo = new Event("EasyNetShopModalOpened");
                    } catch (error) {
                        eventmo = document.createEvent("Event");
                        eventmo.initEvent("EasyNetShopModalOpened", false, false);
                    }
                    document.dispatchEvent(eventmo);

                });
            return false;
        });

       ens_jQuery('.easynetshop-modal-fade-wrapper').click(function() {
            hideEasynetshopModals();
        });
        /*ens_jQuery('.easynetshop-modal').click(function(e) {
            e.stopPropagation();
            e.preventDefault()
        });
        ens_jQuery('.easynetshop-modalcontainer').click(function() {
			hideEasynetshopModals();
        });*/

        updateEasynetshopCart();

        ens_jQuery('body').mouseleave(function(event) {
            if(event.clientY>200) return;
            if(event.clientX<100) return;
            if(event.clientX>document.body.offsetWidth-100) return;
            
            var name = 'EASYNETSHOP_LEAVE';
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
            var leaved=matches ? decodeURIComponent(matches[1]) : undefined;
            if (ens_jQuery('.easynetshop-modal-leavepopup .easynetshop-modal-body').html() != '---' && leaved!=1) {
                hideEasynetshopModals();
                host = window.location.hostname.replace('www.', '');
				if (host.indexOf("xn----") < 0) host = punycode.ToASCII(host);
				var date = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
                document.cookie = "EASYNETSHOP_LEAVE=1; path=/; domain=." + host;
                ens_jQuery('.easynetshop-modal-leavepopup').show();
                ens_jQuery('.easynetshop-modalcontainer').show();
                ens_jQuery('body').addClass('easynetshop-bodyhide');
                ens_jQuery('.easynetshop-modal-fade-wrapper').show();
                var eventmo = null;
				try {
					eventmo = new Event("EasyNetShopModalOpened");
				} catch (error) {
					eventmo = document.createEvent("Event");
					eventmo.initEvent("EasyNetShopModalOpened", false, false);
				}
				document.dispatchEvent(eventmo);
            }
        });

        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        if (getParameterByName('ensp') != null) {
            var name = 'ensp';
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            if (matches == undefined) {
                host = window.location.hostname.replace('www.', '');
                if (host.indexOf("xn----") < 0)
                    host = punycode.ToASCII(host);
                var date = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000 * 120);
                document.cookie = "ensp=" + getParameterByName('ensp') + "; path=/; domain=." + host + "; expires=" + date.toUTCString();
            }
        }

        var eventl = null;
        try {
            eventl = new Event("EasyNetShopLoaded");
        } catch (error) {
            eventl = document.createEvent("Event");
            eventl.initEvent("EasyNetShopLoaded", false, false);
        }
        document.dispatchEvent(eventl);
    } else {
        //already included
    }
});

function easynetshop_buy(id, id_detail) {
 	id_detail = typeof id_detail !== 'undefined' ?  id_detail : '';
    hideEasynetshopModals();
    ens_jQuery('.easynetshop-loader').show();

    //ecommerce
    if(typeof easynetshop_productscommerce != 'undefined')
    for (i = 0; i < ecommerce_data.length; i++)
        if (ecommerce_data[i].id == id) {
            data = {
                "ecommerce": {
                    "currencyCode": ecommerce_currency,
                    "add": {
                        "products": [{
                            "id": ecommerce_data[i].id,
                            "name": ecommerce_data[i].name,
                            "price": ecommerce_data[i].price,
                            "quantity": 1
                        }]
                    }
                }
            };
            dataLayer.push(data);
	

            if (typeof gtag !== 'undefined') {
                gtag('event', 'select_content', {
		    'content_type': 'product',
			'items': [
    			{
                    'id': ecommerce_data[i].id,
                    'name': ecommerce_data[i].name,
                    'price': ecommerce_data[i].price,
                    'quantity': '1',
                    'currency': ecommerce_currency
			}
			]
                });
                gtag('ecommerce:send');
            }
        }
        //

    ens_jQuery.ajax({
            method: "POST",
            url: base_frontend_url,
            data: {
                action: "add2cart",
                id: id,
		id_detail: id_detail 
            },
            dataType: 'text',
            cache: false,
            xhrFields: {
                withCredentials: false
            },
            headers: {
                "X-COOKIE": getEasynetshopCookie()
            },
            crossDomain: true,
            success: function(output, status, xhr) {
                var sess_id = xhr.getResponseHeader("X-COOKIE");
                if (sess_id != '') updateEasynetshopCookie(sess_id);
            }
        })
        .done(function(msg) {
	    if (msg.substring(0, 6) == 'NOMORE') {
		alert(ens_nomore);
		ens_jQuery('.easynetshop-loader').hide();
		}
            else{        
            updateEasynetshopCart();
            ens_jQuery('.easynetshop-loader').hide();
            ens_jQuery('.easynetshop-modal-fade-wrapper').show();
            ens_jQuery('.easynetshop-modal-addtocart').show();
            ens_jQuery('.easynetshop-modalcontainer').show();
            ens_jQuery('body').addClass('easynetshop-bodyhide');
		}
            var eventmo = null;
			try {
				eventmo = new Event("EasyNetShopModalOpened");
			} catch (error) {
				eventmo = document.createEvent("Event");
				eventmo.initEvent("EasyNetShopModalOpened", false, false);
			}
			document.dispatchEvent(eventmo);
        });
    return false;
}

function hideEasynetshopModals() {
    ens_jQuery('.easynetshop-modal-addtocart').hide();
    ens_jQuery('.easynetshop-modal-cart').hide();
    ens_jQuery('.easynetshop-modal-order').hide();
    ens_jQuery('.easynetshop-modal-ordercompleate').hide();
    ens_jQuery('.easynetshop-modal-fade-wrapper').hide();
    ens_jQuery('.easynetshop-modal-cartempty').hide();
    ens_jQuery('.easynetshop-modal-leavepopup').hide();
    ens_jQuery('.easynetshop-modalcontainer').hide();
    ens_jQuery('body').removeClass('easynetshop-bodyhide');
    var eventmc = null;
    try {
        eventmc = new Event("EasyNetShopModalClosed");
    } catch (error) {
        eventmc = document.createEvent("Event");
        eventmc.initEvent("EasyNetShopModalClosed", false, false);
    }
    document.dispatchEvent(eventmc);
}

function getEasynetshopCart(HideOld) {
    if (HideOld == undefined || HideOld == true)
        hideEasynetshopModals();
    ens_jQuery('.easynetshop-loader').show();
    ens_jQuery.ajax({
            method: "POST",
            url: base_frontend_url,
            data: {
                action: "getcart"
            },
            dataType: 'text',
            cache: false,
            xhrFields: {
                withCredentials: false
            },
            headers: {
                "X-COOKIE": getEasynetshopCookie()
            },
            crossDomain: true,
            success: function(output, status, xhr) {
                var sess_id = xhr.getResponseHeader("X-COOKIE");
                if (sess_id != '') updateEasynetshopCookie(sess_id);
            }
        })
        .done(function(msg) {
            ens_jQuery('.easynetshop-loader').hide();
            ens_jQuery('.easynetshop-modal-cart .easynetshop-modal-body').html(msg);
            ens_jQuery('.easynetshop-modal-fade-wrapper').show();
            if (msg == '') {
                ens_jQuery('.easynetshop-modal-cart').hide();
                ens_jQuery('.easynetshop-modal-cartempty').show();
                ens_jQuery('.easynetshop-modalcontainer').show();
                ens_jQuery('body').addClass('easynetshop-bodyhide');
            } else {
                ens_jQuery('.easynetshop-deliveryoptions').change(function() {
                    $selected_delivery = ens_jQuery(this).val();
                    var $price = ens_jQuery(this).find('option:selected').data('rel') * 1;
                    var $name = ens_jQuery(this).find('option:selected').html().replace(/\s\(.*\)/g, '');
                    var $disc = ens_jQuery('.easynetshop-discountprice').html() * 1;
                    if (isNaN($disc)) $disc = 0;
                    ens_jQuery('.easynetshop-deliveryprice').html($price);
                    ens_jQuery('.easynetshop-deliveryname').html($name);
                    ens_jQuery('.easynetshop-allprice').html(ens_jQuery('.easynetshop-goodsprice').html() * 1 + $disc + $price);
                });

                ens_jQuery('.easynetshop-modal-cart').show();
                ens_jQuery('.easynetshop-continue').show();
                ens_jQuery('.easynetshop-modalcontainer').show();
                ens_jQuery('body').addClass('easynetshop-bodyhide');
                ens_jQuery('.easynetshop-deliveryoptions option[value="' + $selected_delivery + '"]').attr('selected', 'selected');
                ens_jQuery('.easynetshop-deliveryoptions').change();
            }

            ens_jQuery('.easynetshop-plus-quant').click(function() {
                ens_jQuery('.easynetshop-loader').show();
                ens_jQuery.ajax({
                        method: "POST",
                        url: base_frontend_url,
                        data: {
                            action: "add2cart",
                            id: ens_jQuery(this).data('rel')
                        },
                        dataType: 'text',
                        cache: false,
                        xhrFields: {
                            withCredentials: false
                        },
                        headers: {
                            "X-COOKIE": getEasynetshopCookie()
                        },
                        crossDomain: true,
                        success: function(output, status, xhr) {
                            var sess_id = xhr.getResponseHeader("X-COOKIE");
                            if (sess_id != '') updateEasynetshopCookie(sess_id);
                        }
                    })
                    .done(function(msg) {
                        getEasynetshopCart(false);
                        updateEasynetshopCart(false);
                        ens_jQuery('.easynetshop-loader').hide();
                    });
            });
            ens_jQuery('.easynetshop-minus-quant').click(function() {
                ens_jQuery('.easynetshop-loader').show();
                ens_jQuery.ajax({
                        method: "POST",
                        url: base_frontend_url,
                        data: {
                            action: "remove2cart",
                            id: ens_jQuery(this).data('rel')
                        },
                        dataType: 'text',
                        cache: false,
                        xhrFields: {
                            withCredentials: false
                        },
                        headers: {
                            "X-COOKIE": getEasynetshopCookie()
                        },
                        crossDomain: true,
                        success: function(output, status, xhr) {
                            var sess_id = xhr.getResponseHeader("X-COOKIE");
                            if (sess_id != '') updateEasynetshopCookie(sess_id);
                        }
                    })
                    .done(function(msg) {
                        getEasynetshopCart(false);
                        updateEasynetshopCart(false);
                        ens_jQuery('.easynetshop-loader').hide();
                    });
            });
            //
            ens_jQuery('.easyshop-quant-input').change(function() {
                ens_jQuery('.easynetshop-loader').show();
                ens_jQuery.ajax({
                        method: "POST",
                        url: base_frontend_url,
                        data: {
                            action: "setquant",
                            id: ens_jQuery(this).data('rel'),
                            quant: ens_jQuery(this).val()
                        },
                        dataType: 'text',
                        cache: false,
                        xhrFields: {
                            withCredentials: false
                        },
                        headers: {
                            "X-COOKIE": getEasynetshopCookie()
                        },
                        crossDomain: true,
                        success: function(output, status, xhr) {
                            var sess_id = xhr.getResponseHeader("X-COOKIE");
                            if (sess_id != '') updateEasynetshopCookie(sess_id);
                        }
                    })
                    .done(function(msg) {
                        getEasynetshopCart(false);
                        updateEasynetshopCart(false);
                        ens_jQuery('.easynetshop-loader').hide();
                    });
            });
            //
            ens_jQuery('.easynetshop-delgood').click(function() {
                ens_jQuery('.easynetshop-loader').show();

                //ecommerce
                if(typeof easynetshop_productscommerce != 'undefined')
                for (i = 0; i < ecommerce_data.length; i++)
                    if (ecommerce_data[i].id == ens_jQuery(this).data('rel')) {
                        data = {
                            "ecommerce": {
                                "currencyCode": ecommerce_currency,
                                "remove": {
                                    "products": [{
                                        "id": ecommerce_data[i].id,
                                        "name": ecommerce_data[i].name,
                                        "price": ecommerce_data[i].price,
                                        "quantity": 1
                                    }]
                                }
                            }
                        };
                        dataLayer.push(data);
                    }
                    //

                ens_jQuery.ajax({
                        method: "POST",
                        url: base_frontend_url,
                        data: {
                            action: "del2cart",
                            id: ens_jQuery(this).data('rel')
                        },
                        dataType: 'text',
                        cache: false,
                        xhrFields: {
                            withCredentials: false
                        },
                        headers: {
                            "X-COOKIE": getEasynetshopCookie()
                        },
                        crossDomain: true,
                        success: function(output, status, xhr) {
                            var sess_id = xhr.getResponseHeader("X-COOKIE");
                            if (sess_id != '') updateEasynetshopCookie(sess_id);
                        }
                    })
                    .done(function(msg) {
                        getEasynetshopCart(false);
                        updateEasynetshopCart(false);
                        ens_jQuery('.easynetshop-loader').hide();
                    });
            });

            ens_jQuery('.easynetshop-form-group input, .easynetshop-form-group textarea, .easynetshop-form-group select').change(function() {
                var custom_fields = [];
		jQuery.ajaxSettings.traditional = false;
            
                ens_jQuery('.easynetshop-customfield').each(function() {
                    custom_fields[custom_fields.length] = {
                        name: ens_jQuery(this).attr('name'),
                        value: ens_jQuery(this).val()
                    }
                });
                ens_jQuery.ajax({
                    method: "POST",
                    url: base_frontend_url,
                    data: {
                        action: "saveinputform",
                        phone: ens_jQuery('.easynetshop-modal-cart input[name="phone"]').val(),
                        email: ens_jQuery('.easynetshop-modal-cart input[name="email"]').val(),
                        comment: ens_jQuery('.easynetshop-modal-cart textarea[name="comment"]').val(),
                        custom_fields: custom_fields,
                        delivery: ens_jQuery('.easynetshop-modal-cart select[name="delivery"]').val()
                    },
                    dataType: 'text',
                    cache: false,
                    xhrFields: {
                        withCredentials: false
                    },
                    headers: {
                        "X-COOKIE": getEasynetshopCookie()
                    },
                    crossDomain: true,
                    success: function(output, status, xhr) {
                        var sess_id = xhr.getResponseHeader("X-COOKIE");
                        if (sess_id != '') updateEasynetshopCookie(sess_id);
                    }
                });
            });

            var eventmo = null;
            try {
                eventmo = new Event("EasyNetShopModalOpened");
            } catch (error) {
                eventmo = document.createEvent("Event");
                eventmo.initEvent("EasyNetShopModalOpened", false, false);
            }
            document.dispatchEvent(eventmo);
        });
}

function updateEasynetshopCookie(sess_id) {
    host = window.location.hostname.replace('www.', '');
    if (host.indexOf("xn----") < 0)
        host = punycode.ToASCII(host);
    var date = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = "EASYNETSHOP=" + sess_id + "; path=/; domain=." + host + "; expires=" + date.toUTCString();
}

function getEasynetshopCookie() {
    var name = 'EASYNETSHOP';
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function updateEasynetshopCart(HideOld) {
    if (HideOld == undefined || HideOld == true)
        hideEasynetshopModals();
    ens_jQuery.ajax({
            method: "POST",
            url: base_frontend_url,
            data: {
                action: "getcartstatus"
            },
            dataType: 'json',
            cache: false,
            xhrFields: {
                withCredentials: false
            },
            headers: {
                "X-COOKIE": getEasynetshopCookie()
            },
            crossDomain: true,
            success: function(output, status, xhr) {
                var sess_id = xhr.getResponseHeader("X-COOKIE");
                if (sess_id != '') updateEasynetshopCookie(sess_id);
            }
        })
        .done(function(msg) {
            ens_jQuery('#easynetshop-cart-info').html(msg.info);
            ens_jQuery('#easynetshop-cart-summ').html(msg.summ);
            ens_jQuery('#easynetshop-cart-count').html(msg.count);
            if (msg.count > 0)
                ens_jQuery('.easynetshop-modal-leavepopup .easynetshop-modal-body').html(msg.notify);
            else
                ens_jQuery('.easynetshop-modal-leavepopup .easynetshop-modal-body').html('---');
            ens_jQuery('#easynetshop-cart').css('display', 'inline-block');
            if (msg.count > 0) {
		numb = msg.count;
		ens_jQuery('#easynetshop-cart-default #enscart_counter').html(numb);
		ens_jQuery('#easynetshop-cart-default #enscart_counter').fadeIn(500);
            } else {
		ens_jQuery('#easynetshop-cart-default #enscart_counter').fadeOut(500);
            }
	    if (msg.cross_sale != undefined) {
            if (msg.cross_sale.length != 0 ) {
		
		var cross = '<div class="easynetshop-cross-caption easynetshop-row">'+msg.cross_sale_caption+'</div><div class="easynetshop-cross-container2 easynetshop-row">';
		for (index = 0; index < msg.cross_sale.length; ++index) {
		        // если нет картинки, то ставим заглушку 
			if (msg.cross_sale[index].img_url == '')  msg.cross_sale[index].img_url = ens_no_image; 
			cross += '<div class="easynetshop-cross-single2 easynetshop-3">';
			cross += '<div class="easynetshop-img-container">	<img src="'+msg.cross_sale[index].img_url+'" class="easynetshop-cross-img_url"> <div> <a class="btn-ens-action btn-ens-cross-style easynetshop-cross-add" data-rel="'+msg.cross_sale[index].id+'">В корзину</a> </div></div>';
                        
			cross += '<div class="easynetshop-text-container">	';
                        if (msg.cross_sale[index].href_url.length >0) {
                            cross += '<a href="'+msg.cross_sale[index].href_url+'" class="easynetshop-cross-name">'+msg.cross_sale[index].name+'</a>';
                            }
                        else {
                            cross += '<span class="easynetshop-cross-name">'+msg.cross_sale[index].name+'</span>';
                        }
                        cross += '	<div class="easynetshop-cross-price">';
                        if (msg.cross_sale[index].old_price > msg.cross_sale[index].price) {
                            cross += '	<span class="easynetshop-cross-old-price">'+msg.cross_sale[index].old_price+' '+msg.valuta+'</span> ';
                        }
			cross += ' '+msg.cross_sale[index].price+' '+msg.valuta+'</div> <div> <a class="btn-ens-action btn-ens-cross-style easynetshop-cross-add-sm" data-rel="'+msg.cross_sale[index].id+'">В корзину</a> </div> </div>';
			cross += '</div>';
			} 
		cross += '</div>';
		ens_jQuery('.easynetshop-recomended').html(cross);
               }
		else {
		ens_jQuery('.easynetshop-recomended').html('');	
		}
	}

        });
}

//Javascript Punycode converter derived from example in RFC3492.
var punycode = new function Punycode() {
    // This object converts to and from puny-code used in IDN
    //
    // punycode.ToASCII ( domain )
    // 
    // Returns a puny coded representation of "domain".
    // It only converts the part of the domain name that
    // has non ASCII characters. I.e. it dosent matter if
    // you call it with a domain that already is in ASCII.
    //
    // punycode.ToUnicode (domain)
    //
    // Converts a puny-coded domain name to unicode.
    // It only converts the puny-coded parts of the domain name.
    // I.e. it dosent matter if you call it on a string
    // that already has been converted to unicode.
    //
    //
    this.utf16 = {
        // The utf16-class is necessary to convert from javascripts internal character representation to unicode and back.
        decode:function(input){
            var output = [], i=0, len=input.length,value,extra;
            while (i < len) {
                value = input.charCodeAt(i++);
                if ((value & 0xF800) === 0xD800) {
                    extra = input.charCodeAt(i++);
                    if ( ((value & 0xFC00) !== 0xD800) || ((extra & 0xFC00) !== 0xDC00) ) {
                        throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
                    }
                    value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
                }
                output.push(value);
            }
            return output;
        },
        encode:function(input){
            var output = [], i=0, len=input.length,value;
            while (i < len) {
                value = input[i++];
                if ( (value & 0xF800) === 0xD800 ) {
                    throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
                }
                if (value > 0xFFFF) {
                    value -= 0x10000;
                    output.push(String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800));
                    value = 0xDC00 | (value & 0x3FF);
                }
                output.push(String.fromCharCode(value));
            }
            return output.join("");
        }
    }

    //Default parameters
    var initial_n = 0x80;
    var initial_bias = 72;
    var delimiter = "\x2D";
    var base = 36;
    var damp = 700;
    var tmin=1;
    var tmax=26;
    var skew=38;
    var maxint = 0x7FFFFFFF;

    // decode_digit(cp) returns the numeric value of a basic code 
    // point (for use in representing integers) in the range 0 to
    // base-1, or base if cp is does not represent a value.

    function decode_digit(cp) {
        return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base;
    }

    // encode_digit(d,flag) returns the basic code point whose value
    // (when used for representing integers) is d, which needs to be in
    // the range 0 to base-1. The lowercase form is used unless flag is
    // nonzero, in which case the uppercase form is used. The behavior
    // is undefined if flag is nonzero and digit d has no uppercase form. 

    function encode_digit(d, flag) {
        return d + 22 + 75 * (d < 26) - ((flag != 0) << 5);
        //  0..25 map to ASCII a..z or A..Z 
        // 26..35 map to ASCII 0..9
    }
    //** Bias adaptation function **
    function adapt(delta, numpoints, firsttime ) {
        var k;
        delta = firsttime ? Math.floor(delta / damp) : (delta >> 1);
        delta += Math.floor(delta / numpoints);

        for (k = 0; delta > (((base - tmin) * tmax) >> 1); k += base) {
                delta = Math.floor(delta / ( base - tmin ));
        }
        return Math.floor(k + (base - tmin + 1) * delta / (delta + skew));
    }

    // encode_basic(bcp,flag) forces a basic code point to lowercase if flag is zero,
    // uppercase if flag is nonzero, and returns the resulting code point.
    // The code point is unchanged if it is caseless.
    // The behavior is undefined if bcp is not a basic code point.

    function encode_basic(bcp, flag) {
        bcp -= (bcp - 97 < 26) << 5;
        return bcp + ((!flag && (bcp - 65 < 26)) << 5);
    }

    // Main decode
    this.decode=function(input,preserveCase) {
        // Dont use utf16
        var output=[];
        var case_flags=[];
        var input_length = input.length;

        var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len;

        // Initialize the state: 

        n = initial_n;
        i = 0;
        bias = initial_bias;

        // Handle the basic code points: Let basic be the number of input code 
        // points before the last delimiter, or 0 if there is none, then
        // copy the first basic code points to the output.

        basic = input.lastIndexOf(delimiter);
        if (basic < 0) basic = 0;

        for (j = 0; j < basic; ++j) {
            if(preserveCase) case_flags[output.length] = ( input.charCodeAt(j) -65 < 26);
            if ( input.charCodeAt(j) >= 0x80) {
                throw new RangeError("Illegal input >= 0x80");
            }
            output.push( input.charCodeAt(j) );
        }

        // Main decoding loop: Start just after the last delimiter if any
        // basic code points were copied; start at the beginning otherwise. 

        for (ic = basic > 0 ? basic + 1 : 0; ic < input_length; ) {

            // ic is the index of the next character to be consumed,

            // Decode a generalized variable-length integer into delta,
            // which gets added to i. The overflow checking is easier
            // if we increase i as we go, then subtract off its starting 
            // value at the end to obtain delta.
            for (oldi = i, w = 1, k = base; ; k += base) {
                    if (ic >= input_length) {
                        throw RangeError ("punycode_bad_input(1)");
                    }
                    digit = decode_digit(input.charCodeAt(ic++));

                    if (digit >= base) {
                        throw RangeError("punycode_bad_input(2)");
                    }
                    if (digit > Math.floor((maxint - i) / w)) {
                        throw RangeError ("punycode_overflow(1)");
                    }
                    i += digit * w;
                    t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                    if (digit < t) { break; }
                    if (w > Math.floor(maxint / (base - t))) {
                        throw RangeError("punycode_overflow(2)");
                    }
                    w *= (base - t);
            }

            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi === 0);

            // i was supposed to wrap around from out to 0,
            // incrementing n each time, so we'll fix that now: 
            if ( Math.floor(i / out) > maxint - n) {
                throw RangeError("punycode_overflow(3)");
            }
            n += Math.floor( i / out ) ;
            i %= out;

            // Insert n at position i of the output: 
            // Case of last character determines uppercase flag: 
            if (preserveCase) { case_flags.splice(i, 0, input.charCodeAt(ic -1) -65 < 26);}

            output.splice(i, 0, n);
            i++;
        }
        if (preserveCase) {
            for (i = 0, len = output.length; i < len; i++) {
                if (case_flags[i]) {
                    output[i] = (String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0);
                }
            }
        }
        return this.utf16.encode(output);
    };

    //** Main encode function **

    this.encode = function (input,preserveCase) {
        //** Bias adaptation function **

        var n, delta, h, b, bias, j, m, q, k, t, ijv, case_flags;

        if (preserveCase) {
            // Preserve case, step1 of 2: Get a list of the unaltered string
            case_flags = this.utf16.decode(input);
        }
        // Converts the input in UTF-16 to Unicode
        input = this.utf16.decode(input.toLowerCase());

        var input_length = input.length; // Cache the length

        if (preserveCase) {
            // Preserve case, step2 of 2: Modify the list to true/false
            for (j=0; j < input_length; j++) {
                case_flags[j] = input[j] != case_flags[j];
            }
        }

        var output=[];


        // Initialize the state: 
        n = initial_n;
        delta = 0;
        bias = initial_bias;

        // Handle the basic code points: 
        for (j = 0; j < input_length; ++j) {
            if ( input[j] < 0x80) {
                output.push(
                    String.fromCharCode(
                        case_flags ? encode_basic(input[j], case_flags[j]) : input[j]
                    )
                );
            }
        }

        h = b = output.length;

        // h is the number of code points that have been handled, b is the
        // number of basic code points 

        if (b > 0) output.push(delimiter);

        // Main encoding loop: 
        //
        while (h < input_length) {
            // All non-basic code points < n have been
            // handled already. Find the next larger one: 

            for (m = maxint, j = 0; j < input_length; ++j) {
                ijv = input[j];
                if (ijv >= n && ijv < m) m = ijv;
            }

            // Increase delta enough to advance the decoder's
            // <n,i> state to <m,0>, but guard against overflow: 

            if (m - n > Math.floor((maxint - delta) / (h + 1))) {
                throw RangeError("punycode_overflow (1)");
            }
            delta += (m - n) * (h + 1);
            n = m;

            for (j = 0; j < input_length; ++j) {
                ijv = input[j];

                if (ijv < n ) {
                    if (++delta > maxint) return Error("punycode_overflow(2)");
                }

                if (ijv == n) {
                    // Represent delta as a generalized variable-length integer: 
                    for (q = delta, k = base; ; k += base) {
                        t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                        if (q < t) break;
                        output.push( String.fromCharCode(encode_digit(t + (q - t) % (base - t), 0)) );
                        q = Math.floor( (q - t) / (base - t) );
                    }
                    output.push( String.fromCharCode(encode_digit(q, preserveCase && case_flags[j] ? 1:0 )));
                    bias = adapt(delta, h + 1, h == b);
                    delta = 0;
                    ++h;
                }
            }

            ++delta, ++n;
        }
        return output.join("");
    }

    this.ToASCII = function ( domain ) {
        var domain_array = domain.split(".");
        var out = [];
        for (var i=0; i < domain_array.length; ++i) {
            var s = domain_array[i];
            out.push(
                s.match(/[^A-Za-z0-9-]/) ?
                "xn--" + punycode.encode(s) :
                s
            );
        }
        return out.join(".");
    }
    this.ToUnicode = function ( domain ) {
        var domain_array = domain.split(".");
        var out = [];
        for (var i=0; i < domain_array.length; ++i) {
            var s = domain_array[i];
            out.push(
                s.match(/^xn--/) ?
                punycode.decode(s.slice(4)) :
                s
            );
        }
        return out.join(".");
    }
}();

function uploadGoods() {
    // Обходим все контейнеры живого поиска и заполняем их
        if (ens_jQuery('.ens-live').html() != undefined)
        {
            ens_jQuery('.ens-live').each(function(){
               var liveseaerch_selector = ens_jQuery(this);
               liveseaerch_selector.html('<div class="lds-container"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
               if (liveseaerch_selector.data('search').length > 2) {
                    ens_jQuery.ajax({
                       method: "POST",
                       url: base_cache_url,
                       data: {
                           action: "getcache",
                           search: ens_jQuery(this).data('search')                           
                       },
                       dataType: 'json',
                       cache: false,
                       xhrFields: {
                           withCredentials: false
                       },
                       crossDomain: true,
		       success: function(msg){ 
                       livesearch = '';
	                   if (msg.goods.length != 0) {
                               	livesearch += '<table class="easynetshop-livesearch-table">';
      	                  	for (index = 0; index < msg.goods.length; ++index) {
	       	                     	
		   		     	// если нет картинки, то ставим заглушку 
				     	if (msg.goods[index].img_url == '')  msg.goods[index].img_url = ens_no_image; 
				     	livesearch += '<tr class="easynetshop-livesearch-tr">';
		                        livesearch += '<td class="easynetshop-livesearch-img"><img src="'+msg.goods[index].img_url+'" class="easynetshop-livesearch-img-url"></td>';
		                        livesearch += '<td class="easynetshop-livesearch-name">'+msg.goods[index].name+'</td>';
		                        livesearch += '<td class="easynetshop-livesearch-price">';
	      	                        if (msg.goods[index].old_price > msg.goods[index].price) {
						livesearch += '<span class="easynetshop-livesearch-old-price">'+msg.goods[index].old_price+' '+msg.valuta+'</span> ';                        
						}
	                            	livesearch += ' '+msg.goods[index].price+' '+msg.valuta+'</td>';
		                	livesearch += '<td class="easynetshop-livesearch-btn"><a class="btn-ens-action btn-ens-style" data-rel="'+msg.goods[index].id+'">В корзину</a> </td>';
					livesearch += '</tr>';
				}				 
				livesearch += '</table>';
				liveseaerch_selector.html(livesearch);
		            }
		     	},
			error: function () {
				liveseaerch_selector.html('<div class="easynetshop-livesearch-error">'+ens_error_load_goodslist+'</div>');
			}
                   });
               }
            });
        }
    }
document.addEventListener("EasyNetShopLoaded", function(event) {
    uploadGoods();
});