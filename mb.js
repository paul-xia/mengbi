(function() {
	var vm = avalon.define({
		$id: 'mb',
		list: [],
		current: 0
	});
	(function(size) {
		for (var i = 1; i <= size; i++) {
			vm.list.push(getRandomNum(1, size));
		}
	})(15);
	var last = vm.list.length;
	sortIt();
	function sortIt(){
		if(vm.list[vm.current] > vm.list[vm.current + 1]) {
			var b = vm.list[vm.current];
			vm.list.set(vm.current, vm.list[vm.current + 1]);
			vm.list.set(vm.current + 1, b);
		}
		if(!last) {
			vm.current = -1;
			return;
		}
		setTimeout(function(){
			if(vm.current > last) {
				vm.current = 0;
				sortIt();
				last -- ;
			} else {
				vm.current ++;
				sortIt();
			}
		}, 10);
	}
	function getRandomNum(Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		var End = (Min + Math.round(Rand * Range));
		if(vm.list.indexOf(End) > -1) End = getRandomNum(Min, Max);
		return End;
	}
})();