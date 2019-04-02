class Observer {
    constructor(data) {
        this.data = data;
        this.walk(data);
    }

    walk(data) {
        Object.keys(data).forEach((key) => {
            this.defineReactive(data,key,data[key]);
        });
    }
    // data 设置触发更新，添加监听者
    defineReactive(data,key,val) {
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get:  () => {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set:  (newVal) => {
                if (newVal === val) return;
                val = newVal;
                dep.notify();
            }
        })
    }
}

class Dep {
    constructor(){
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }
    
    notify() {
        this.subs.forEach(function(watcher) {
            watcher.update();
        });
    }
}

Dep.target = null;

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};