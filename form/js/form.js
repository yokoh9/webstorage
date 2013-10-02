$(function(){
	// ローカルストレージ非対応環境
	if (!window.localStorage) return;

	var $text = $('input[type=text], textarea');
	var $checkbox = $('input[type=checkbox]');
	var $radio = $('input[type=radio]');
	var $select = $('select');

	//ローカルストレージの読み込み
	function init(){
		//text, textarea
		$.each($text, function(){
			var inputName = $(this).attr('name');
			if(localStorage[inputName]){
				$(this).val(localStorage[inputName]);
			}
		});
		//checkbox
		$.each($checkbox, function(){
			var inputName = $(this).attr('name');
			var inputValue = $(this).attr('value');
			var cbValues = JSON.parse(localStorage.getItem(inputName));
			if($.inArray(inputValue, cbValues) != -1){
				$(this).attr('checked','checked');
			}
		});
		//radio
		$.each($radio, function(){
			var inputName = $(this).attr('name');
			var inputValue = $(this).attr('value');
			if(localStorage[inputName]){
				if(inputValue == localStorage[inputName]){
					$(this).attr('checked','checked');
				}
			}
		});
		//select
		$.each($select, function(){
			var inputName = $(this).attr('name');
			var optionValue = localStorage[inputName];
			$('[name="' + inputName + '"]').find('option[value="' + optionValue + '"]').attr('selected', true);
		});

		bindEvent();
	}//init

	init();

	//ローカルストレージへの保存・削除
	function bindEvent(){
		//text, textarea, radio, select
		// $($text, $radio, $select).change(function(){
		// 	localStorage[$(this).attr('name')] = $(this).val();
		// });
		$('input[type=text], textarea, input[type=radio], select').change(function(){
			localStorage.setItem($(this).attr('name'), $(this).val());
		});
		//checkbox
		$checkbox.change(function(){
			var inputName = $(this).attr('name');
			var inputValue = $(this).attr('value');
			var cbValues = new Array;
			$.each( $('[name="' + inputName + '"]'), function(){
				if( $(this).is(':checked') ){
					cbValues.push($(this).attr('value'));
				}
			});
			//配列の格納
			localStorage.setItem(inputName, JSON.stringify(cbValues));
		});
		//データ削除
		$('input[type=reset]').click(function(){
			localStorage.clear();
		});
	}
});