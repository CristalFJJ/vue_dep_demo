class SelfVue {
    constructor(options) {
		this.data = options.data;
		this.methods = options.methods;
		Object.keys(this.data).forEach((key)=> {
			this.proxyKeys(key);
		});
		observe(this.data);
		new Compile(options.el, this);
		options.mounted.call(this); // 所有事情处理好后执行mounted函数
    }
    proxyKeys(key) {
		Object.defineProperty(this, key, {
			enumerable: false,
			configurable: true,
			get: () => {
				return this.data[key];
			},
			set: (newVal) => {
				this.data[key] = newVal;
			}
		});
    }
}