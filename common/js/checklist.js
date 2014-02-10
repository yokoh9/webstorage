$(function(){
	// ローカルストレージ非対応環境
	if (!window.localStorage) return;

	$.getJSON('./js/items.json', function(data){
		renderItemList(data);
	});

	// 商品リストの生成
	function renderItemList(data){
		if(data.length > 0){
			$('#itemListTemplate').tmpl(data).appendTo('.item_list');
		} else {
			$('<p">ただいま展示商品はございません。</p>').appendTo('.item_list');
		}
	}


});


(function() {
// package
});
