(function() {
	var vm = avalon.define({
		$id: 'mb',
		list: [],
		current: -1,
		size: 0,
		speed: 200,
		isSort: false,
		getList: function(){
			vm.list.clear();
			for (var i = 1; i <= vm.size; i++) {
				vm.list.push(getRandomNum(1, vm.size));
			}
			vm.last = vm.size;
		},
		getSort: function(){
			if(!vm.last) vm.last = vm.list.length;
			vm.current = 0;
			sortIt();
			vm.isSort = true;
		},
		last: 0
	});
	var timer;
	vm.$watch('size', function(a){
		console.log(a)
		if(timer){
			clearTimeout(timer);
		}
		timer = setTimeout(function(){
			vm.getList();
			vm.isSort = false;
		}, 1000);
	});
	function sortIt(){
		if(vm.list[vm.current] > vm.list[vm.current + 1]) {
			var b = vm.list[vm.current];
			vm.list.set(vm.current, vm.list[vm.current + 1]);
			vm.list.set(vm.current + 1, b);
		}
		if(vm.last === 0) {//结束
			vm.current = -1;
			return;
		}
		setTimeout(function(){
			if(vm.current + 1 === vm.last) {
				vm.current = 0;
				vm.last -- ;
				sortIt();
			} else {
				vm.current ++;
				sortIt();
			}
		}, vm.speed);
	}
	function getRandomNum(Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		var End = (Min + Math.round(Rand * Range));
		if(vm.list.indexOf(End) > -1) End = getRandomNum(Min, Max);
		return End;
	}
})();