(function () {
  console.log('匿名行数执行');
  var data = [
    {
        "id": "2c92316a6ea09d99016ec596a2690031",
        "name": "科技研发专项领域",
        "parentId": "0"
    },
    {
        "id": "2c92316a6ea09d99016ec5974fe90032",
        "name": "重大专项领域",
        "parentId": "0"
    },
    {
        "id": "2c92316a6ea09d99016ec597785e0033",
        "name": "电子信息",
        "parentId": "0"
    },
    {
        "id": "2c92316a6ea09d99016ec597ab840034",
        "name": "先进制造与自动化",
        "parentId": "0"
    },
    {
        "id": "2c92316a6ea09d99016ec597de9f0035",
        "name": "生物与新医药",
        "parentId": "0"
    },
    {
        "id": "2c92316a6ea09d99016ec598b84d0036",
        "name": "高端新型电子信息",
        "parentId": "2c92316a6ea09d99016ec596a2690031"
    },
    {
        "id": "2c92316a6ea09d99016ec59928850037",
        "name": "LED领域",
        "parentId": "2c92316a6ea09d99016ec596a2690031"
    },
    {
        "id": "2c92316a6ea09d99016ec59979f70038",
        "name": "新能源汽车领域",
        "parentId": "2c92316a6ea09d99016ec596a2690031"
    },
    {
        "id": "2c92316a6ea09d99016ec59a0c600039",
        "name": "生物领域",
        "parentId": "2c92316a6ea09d99016ec596a2690031"
    },
    {
        "id": "2c92316a6ea09d99016ec59a915a003a",
        "name": "高端装备制造",
        "parentId": "2c92316a6ea09d99016ec596a2690031"
    },
    {
        "id": "2c92316a6ea09d99016ec59be924003c",
        "name": "移动互联网关键技术",
        "parentId": "2c92316a6ea09d99016ec5974fe90032"
    },
    {
        "id": "2c92316a6ea09d99016ec59c5e5f003d",
        "name": "云计算与大数据管理技术",
        "parentId": "2c92316a6ea09d99016ec5974fe90032"
    },
    {
        "id": "2c92316a6ea09d99016ec59d0b98003e",
        "name": "软件",
        "parentId": "2c92316a6ea09d99016ec597785e0033"
    },
    {
        "id": "2c92316a6ea09d99016ec59d428d003f",
        "name": "微电子",
        "parentId": "2c92316a6ea09d99016ec597785e0033"
    },
    {
        "id": "2c92316a6ea09d99016ec59de3070040",
        "name": "计算机产品及其网络应用",
        "parentId": "2c92316a6ea09d99016ec597785e0033"
    },
    {
        "id": "2c92316a6ea09d99016ec59e294a0041",
        "name": "通信",
        "parentId": "2c92316a6ea09d99016ec597785e0033"
    },
    {
        "id": "2c92316a6ea09d99016ec59ecb9c0043",
        "name": "工业生产过程控制系统",
        "parentId": "2c92316a6ea09d99016ec597ab840034"
    },
    {
        "id": "2c92316a6ea09d99016ec59f020b0044",
        "name": "安全生产",
        "parentId": "2c92316a6ea09d99016ec597ab840034"
    },
    {
        "id": "2c92316a6ea09d99016ec59f3eef0045",
        "name": "高性能、智能化仪器仪表",
        "parentId": "2c92316a6ea09d99016ec597ab840034"
    },
    {
        "id": "2c92316a6ea09d99016ec59f7f6c0046",
        "name": "先进制造工艺与装备",
        "parentId": "2c92316a6ea09d99016ec597ab840034"
    },
    {
        "id": "2c92316a6ea09d99016ec59fb5430047",
        "name": "新型机械",
        "parentId": "2c92316a6ea09d99016ec597ab840034"
    },
    {
        "id": "2c92316a6ea09d99016ec5a014130048",
        "name": "医药生物",
        "parentId": "2c92316a6ea09d99016ec597de9f0035"
    },
    {
        "id": "2c92316a6ea09d99016ec5a059af0049",
        "name": "中药、天然药物",
        "parentId": "2c92316a6ea09d99016ec597de9f0035"
    },
    {
        "id": "2c92316a6ea09d99016ec5a09c0f004a",
        "name": "化学药研发",
        "parentId": "2c92316a6ea09d99016ec597de9f0035"
    },
    {
        "id": "2c92316a6ea09d99016ec5a35eec004e",
        "name": "嵌入式软件",
        "parentId": "2c92316a6ea09d99016ec59d0b98003e"
    },
    {
        "id": "2c92316a6ea09d99016ec5a3e051004f",
        "name": "集成电路设计",
        "parentId": "2c92316a6ea09d99016ec59d428d003f"
    },
    {
        "id": "2c92316a6ea09d99016ec5a4afc10050",
        "name": " 集成电路封装",
        "parentId": "2c92316a6ea09d99016ec59d428d003f"
    },
    {
        "id": "2c92316a6ea09d99016ec5a4d8850051",
        "name": " 集成电路测试",
        "parentId": "2c92316a6ea09d99016ec59d428d003f"
    },
    {
        "id": "2c92316a6eef39ca016ef2b14da60000",
        "name": "电信",
        "parentId": "2c92316a6ea09d99016ec59e294a0041"
    },
    {
        "id": "2c92316a6ef2cc34016ef2dbb9b10001",
        "name": "移动",
        "parentId": "2c92316a6ea09d99016ec59e294a0041"
    },
    {
        "id": "2c92316a6ef2cc34016ef2dd45670003",
        "name": "联通",
        "parentId": "2c92316a6ea09d99016ec59e294a0041"
    },
    {
        "id": "2c92316a6f03024e016f0d4a5e8d000a",
        "name": "计算与通信芯片",
        "parentId": "2c92316a6ea09d99016ec5974fe90032"
    },
    {
        "id": "2c92316a6f55c535016f6567d1560025",
        "name": "1111",
        "parentId": "2c92316a6ea09d99016ec598b84d0036"
    },
    {
        "id": "2c92316a7067910c0170755a10f3001d",
        "name": "电子信息",
        "parentId": "0"
    },
    {
        "id": "2c92316a708fa4b301710f8c795f008c",
        "name": "22",
        "parentId": "0"
    },
    {
        "id": "2c92316a708fa4b301710f8c9023008d",
        "name": "33",
        "parentId": "0"
    },
    {
        "id": "2c92316a708fa4b301710f8d23e2008e",
        "name": "77",
        "parentId": "2c92316a708fa4b301710f8c795f008c"
    },
    {
        "id": "2c92316a708fa4b301710f8dd8b9008f",
        "name": "5646666",
        "parentId": "2c92316a708fa4b301710f8d23e2008e"
    },
    {
        "id": "2c92316a708fa4b301710f90bf540091",
        "name": "564",
        "parentId": "2c92316a708fa4b301710f8dd8b9008f"
    },
    {
        "id": "2c92316a708fa4b301710f90db830092",
        "name": "564",
        "parentId": "2c92316a708fa4b301710f90bf540091"
    },
    {
        "id": "2c92316a7110a7dd017110f403900000",
        "name": "1",
        "parentId": "2c92316a6f55c535016f6567d1560025"
    },
    {
        "id": "2c92316a7110a7dd017110f44dc00001",
        "name": "2",
        "parentId": "2c92316a6f55c535016f6567d1560025"
    },
    {
        "id": "2c92316a7110a7dd017110f472dc0002",
        "name": "4",
        "parentId": "2c92316a7110a7dd017110f403900000"
    }
]

//data
    function handleData(arr = []) {
        if (!arr.length) return;
        // for(let i = 0; i < arr.length; i++) {

        // }

        // let copyArr = [...arr]
        // if(copyArr.length == 0) return arr;
        // for(let i = 0; i < arr.length; i++){
        //     for(let y = 0; y < arr.length - 1; y++) {
        //         if(arr[i].id == arr[y].parentId){
        //             arr[i].childen = [arr[y]]
        //             copyArr.splice(y, 1);
        //             handleData(copyArr)
        //         }
        //     }
        // }



        // if (!arr) return [];
        // console.log(arr, 'arr-入参');
        // let arrdata = [];
        // const newArr = [...arr];
        // for(let i = 0; i < newArr.length; i++) {
        //     if(newArr[i].parentId == 0) {
        //         arrdata.push(newArr[i]);
        //         newArr.splice(i, 1);
        //         i--;
        //     }
        // }
        // for(let i = 0; i < arrdata.length; i++) {
        //     for(let y = 0; y < newArr.length; y++) {
        //         if (arrdata[i].id == newArr[y].parentId) {
        //             arrdata[i].childen = [...arrdata[i].childen || [], newArr[y]]
        //             newArr.splice(y, 1);
        //             y--;
        //         }

        //     }
        // }
        // for(let i = 0; i < arrdata.length; i++) {
        //     let item1 = arrdata[i].childen || [];
        //     for(let e = 0; e < item1.length; e++) {
        //         for(let y = 0; y < newArr.length; y++) {
        //             if (item1[e].id == newArr[y].parentId) {
        //                 item1[e].childen = [...item1[e].childen || [], newArr[y]]
        //                 newArr.splice(y, 1);
        //                 y--;
        //             }
        //         }
        //     }
        // }
        // for(let i = 0; i < arrdata.length; i++) {
        //     let item1 = arrdata[i].childen || [];
        //     for(let e = 0; e < item1.length; e++) {
        //         let item2 = item1[e].childen || [];
        //         for(let j = 0; j < item2.length; j++){
        //             for(let y = 0; y < newArr.length; y++) {
        //                 if (item2[j].id == newArr[y].parentId) {
        //                     item2[j].childen = [...item2[j].childen || [], newArr[y]]
        //                     newArr.splice(y, 1);
        //                     y--;
        //                 }
        //             }
        //         }
        //     }
        // }
        // // newArr.forEach((item, index) => {
        // //     if(item['parentId'] == 0) {
        // //         arrdata.push(item);
        // //         newArr.splice(index, 1);
        // //         index - 1;
        // //     }
        // // })
        // console.log(arrdata, 'return arrdata');
        // console.log(newArr, 'newArr');

    }
    handleData(data);
}());
