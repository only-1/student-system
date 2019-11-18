$(function() {

      $.fn.raty.defaults.path = '../framwork/raty/lib/img';

      $('#star').raty({ 
      	half:true,
 		// target    : '#hint',
  	// 	targetKeep: true,
  	// 	targetType: 'number',
  	// 	hints:['很差','差','一般','好','很好']
      });
})