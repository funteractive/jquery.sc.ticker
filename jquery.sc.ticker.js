/**
 * jQuery.suitcase.ticker
 *
 * @version    0.1.0-beta
 * @author     Keisuke Imura <keisuke@keisuke-imura.com>
 * @license    The MIT License
 * @link       http://funteractive.jp/
 */
;(function($){

	$.fn.extend({
		scTicker: function(options){
			$.scTicker.init(options, $(this));
		}
	});
	$.scTicker = {
		init: function(options, $node){
			var defaults = {
				'speed':	2000,	//ティッカーの動く間隔
				'duration':	600,	//ティッカーのフェードの時間
				'delay':	1000	//ティッカーの出ている時間
			}
			var options = $.extend(defaults, options);

			this.speed = options.speed;
			this.duration = options.duration;
			this.delay = options.delay;

			this.$node = $node;
			this.tickerLength = this.$node.find('li').length;

			this.$node.find('li').hide().eq(0).show();
			this.start(0);

			//マウスオーバーでティッカーストップ
			var that = this;
			if(this.moveTimer){
				this.$node.find('li').on('mouseover', function(){
					clearTimeout(that.moveTimer);
				}).on('mouseout', function(){
					var index = that.$node.find('li').index($(this));
					that.start(index);
				});
			}
		},

		start: function(index){
			this.index = index;
			var that = this;

			//次のインフォメーションを出す
			if(this.index >= this.tickerLength - 1){
				this.index = 0;
			} else {
				this.index = index + 1;
			}
			this.moveTimer = setTimeout(function(){ that.move(that.index); }, that.speed + that.duration * 2 + that.delay);
		},

		move: function(index){
			this.index = index;
			this.$node.find('li').fadeOut(this.duration).delay(this.delay).eq(index).filter(':not(:animated)').fadeIn(this.duration);

			//次のインフォメーションを出す
			if(this.index >= this.tickerLength - 1){
				this.index = 0;
			} else {
				this.index = index + 1;
			}
			var that = this;
			this.moveTimer = setTimeout(function(){ that.move(that.index); }, that.speed + that.duration * 2 + that.delay);
		}
	};

})(jQuery);
