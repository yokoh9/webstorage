$(function(){
	// ローカルストレージ非対応環境
	if (!window.localStorage) return;

	function init(){
		$.getJSON('./js/items.json', function(data){
			if($('#itemListTemplate').size()>0){
				render.itemList(data);
			} else if($('#itemDetailTemplate').size()>0){
				render.itemDetail(data);
			}
			//チェックリスト表示
			render.checklist(data);
		});
	};

	init();


	var render = {
		//商品一覧の生成
		itemList: function(data){
			if(data.length > 0){
				$('#itemListTemplate').tmpl(data).appendTo('.item_list');
			} else {
				$('<div class="col-xs-12 col-sm-9">ただいま展示商品はございません。</div>').appendTo('.item_list');
			}
		},

		//商品詳細の生成
		itemDetail: function(data){
			var path = location.pathname.split('/');
			var itemId = path.pop().slice(5, -5);
			var grepItem = $.grep(data, function(element, i){
				return itemId == element.id;
			});
			if(grepItem.length > 0){
				$('#itemDetailTemplate').tmpl(grepItem).appendTo('.item_detail');
			} else {
				$('<div class="col-xs-12 col-sm-9">ただいまこちらの商品のお取り扱いはしておりません。</div>').appendTo('.item_detail');
			}
			addCheckList(itemId);
		},

		//チェックしアイテムの生成
		checklist: function(data){
			if(localStorage['checkItems'] != undefined){
				var arrItems = JSON.parse(localStorage.getItem('checkItems'));
				var grepItems = $.grep(data, function(element, i){
					return $.inArray(element.id, arrItems) != -1;
				});
				if(grepItems.length > 0){
					$('#checkListTemplate').tmpl(grepItems).appendTo('.checklist');
				} else {
					$('<div class="col-xs-12 col-sm-9">履歴はありません。</div>').appendTo('.item_detail');
				}
			}
		}

	};//render


	//チェックリストにアイテムIDを追加
	function addCheckList(itemId){
		if(localStorage['checkItems'] == undefined){
			//配列にして格納
			var arr = [];
			arr.push(itemId);
			localStorage.setItem('checkItems', JSON.stringify(arr));
		} else {
			var arr = JSON.parse(localStorage.getItem('checkItems'));
			//同じアイテムがなければ追加
			if($.inArray(itemId, arr) == -1){
				arr.unshift(itemId);
			}
			//アイテムが5つ以上なら、最後のアイテムを削除
			if(arr.length > 5){
				arr.pop();
			}
			localStorage.setItem('checkItems', JSON.stringify(arr));
		}
	};

});