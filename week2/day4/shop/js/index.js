let productData = null;

// 获取元素
let headerBox = document.getElementById('header'),
  linkList = headerBox.getElementsByTagName('a'),
  listBox = document.getElementById('list'),
  productList = listBox.getElementsByTagName('li');

// 1. 基于ajax获取数据
let xhr = new XMLHttpRequest(); // 创建一个ajax实例对象
xhr.open('GET', 'json/product.json', false); // 调用xhr的open方法
xhr.onreadystatechange = function () {
  // 监听xhr的onreadystatechange 事件
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 如果满足这个条件，就表示当前请求已经顺利完成
    productData = xhr.responseText;
  }
};
xhr.send(null); // 发送ajax请求

// 2. 解析从服务端获取的数据

productData = JSON.parse(productData);

// 3. 数据绑定:基于我们从服务端获取的数据，把页面中需要的数据和html结构搞出来，最后把数据和html添加到页面中的指定容器中。

let str = ``; // 模板字符串
// `bg${ i % 2}` 如果在模板字符串中使用变量，需要这种语法 ${变量}
// 模板字符串拼接也是+=
for (let i = 0; i < productData.length; i++) {
  let item = productData[i];
  // str在这里还只是一个字符串，不能通过.属性名的方式自定义属性
  str += `<li data-price="${item.price}" 
              data-time="${item.time}" 
              data-hot="${item.hot}">
            <a href="javascript:;">
              <img src="${item.img}" alt="">
              <p>${item.title}</p>
              <span>￥${item.price}</span>
             </a>
           </li>`
}

// 把拼接好的html字符串插入到页面的指定容器中（这些拼接好的字符串在没有添加到页面中，再此之前还不是元素）
listBox.innerHTML = str;

// 基于价格给productList里面的li排序

let sortList = function () {
  // 用来处理排序逻辑的方法

  // 1. 根据getElementsByTagName获取的是一个元素集合，而元素集合是一个类数组，如果想调用sort进行排序，需要先将类数组转化成数组，数组中li并不是克隆出来的，而是原有类数组中元素对象对应的堆内存空间地址。
  // let productArr = [].slice.call(productList);
  // console.log(productList);
  let productArr = [...productList];
  // console.log(productArr);

  // 2. 基于sort按照价格给li排序
  productArr.sort((a, b) => {
    // a 和 b都是li元素对象，所以不能直接相减。
    // 我们需要从li上面获取到价格
    let aInn, bInn;
    aInn = a.getAttribute('data-price');
    bInn = b.getAttribute('data-price');
    // console.log(aInn, bInn);
    return aInn - bInn
  });
  console.log(productArr);

  // 3. productArr 排好序后页面中并没有按照价格排列，原因是我们还需要把排好序的li依次插入到ul#list（id为list的ul）中
  for (let i = 0; i < productArr.length; i++) {
    listBox.appendChild(productArr[i]); // appendChild 向元素末尾追加元素，但是页面中还是10个而不是20个，只是原来的10个顺序发生了变更。为啥？
  }
};
linkList[1].onclick = function () {
  // 点击价格a标签的时候给li排序
  sortList();
};






























