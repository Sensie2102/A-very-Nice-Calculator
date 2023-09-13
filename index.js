class stack{
    constructor() {
        this.items = []
    }
    push(elem){
        return this.items.push(elem);
    }

    pop(){
        if(this.items.length >0){
            return this.items.pop();
        }
    }
    top(){
        return this.items[this.items.length-1]
    }
    isEmpty(){
        return this.items.length == 0
    }
    size(){
        return this.items.length
    }
    clear(){
        this.items=[]
    }
}

function isAlpha(c){
    if(((c>="a")&&(c<="z"))||((c>="A")&&(c<="Z"))){
        return true
    }
    return false
}

function isDigit(c){
    if((c>="0")&&(c<="9")){
        return true
    }
    return false
}

function isOperator(c) {
    return !isAlpha(c) && !isDigit(c);
  }
   
function getPriority(C) {
    if (C == "-" || C == "+") return 1;
    else if (C == "*" || C == "/") return 2;
    else if (C == "^") return 3;
    return 0;
}

const op_stack = new stack()
const num_stack = new stack()

function eval(exp){
    //for pushing the elements into the respective stacks
    let ini_idx = 0
    let fin_idx = 0
    for(let i = 0;i<exp.length;i++){
        if(isOperator(exp[i])){
            fin_idx = i-1
            let res = exp.slice(ini_idx,fin_idx+1)
            num_stack.push(res)
            op_stack.push(exp[i])
            ini_idx = i+1
        }
        if(i == exp.length-1){
            if(isOperator(exp[i])){
                alert("Invalid expression")
                return
            }
            fin_idx = i
            let res = exp.slice(ini_idx,fin_idx+1)
            num_stack.push(res)
        }
    }
    console.log(num_stack.items)
    console.log(op_stack.items)
    //for performing operation
    while(!op_stack.isEmpty()){
        let op = op_stack.pop()
        let n2 = Number(num_stack.pop())
        let n1 = Number(num_stack.pop())
        let res = operate(op,n1,n2)
        console.log(res)
        num_stack.push(res)
    }
}

function operate(op,n1,n2){
    switch(op){
        case "+":
            return n1+n2
        case "-":
            return n1-n2
        case "*":
            return n1*n2
        case "/":
            if(n2 == "0"){ alert("cannot be divided by 0"); return null}
            return n1/n2
    }
}

$("button").click(function(){
    var prev_val = $(".prev-op").text()
    var cur_val = $(".curr-op").text()
    let bt_val = $(this).text()
    if(bt_val == "AC") {clear()}
    else if(bt_val == "="){
        eval(cur_val)
        $(".curr-op").text(num_stack.pop())
    }
    else{
        $(".curr-op").text(cur_val+bt_val)
    }   
})

function clear(){
    $(".curr-op").text("")
    $(".prev-op").text("")
}

