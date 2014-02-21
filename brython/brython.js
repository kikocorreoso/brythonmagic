// brython.js www.brython.info
// version [3, 3, 0, 'alpha', 0]
// implementation [2, 0, 0, 'final', 2]
// version compiled from commented, indented source files at https://bitbucket.org/olemis/brython/src

var __BRYTHON__={}
__BRYTHON__.builtins={
__repr__:function(){return "<module 'builtins>'"},
__str__:function(){return "<module 'builtins'>"}, 
}
__BRYTHON__.__getattr__=function(attr){return this[attr]}
__BRYTHON__.__setattr__=function(attr,value){
if(['debug'].indexOf(attr)>-1){__BRYTHON__[attr]=value}
else{throw __BRYTHON__.builtins.AttributeError('__BRYTHON__ object has no attribute '+attr)}
}
__BRYTHON__.language=window.navigator.userLanguage || window.navigator.language
__BRYTHON__.date=function(){
var JSObject=__BRYTHON__.JSObject
if(arguments.length===0){return JSObject(new Date())}
else if(arguments.length===1){return JSObject(new Date(arguments[0]))}
else if(arguments.length===7){return JSObject(new Date(arguments[0],
arguments[1]-1,arguments[2],arguments[3],
arguments[4],arguments[5],arguments[6]))}
}
__BRYTHON__.has_local_storage=typeof(Storage)!=="undefined"
if(__BRYTHON__.has_local_storage){
__BRYTHON__.local_storage=function(){
if(typeof localStorage.getItem==='function'){
var res=__BRYTHON__.JSObject(localStorage)
}else{
var res=new Object()
res.__getattr__=function(attr){return this[attr]}
res.getItem=function(key){return localStorage.getItem(str(key))}
res.setItem=function(key,value){localStorage.setItem(str(key),str(value))}
return res
}
res.__repr__=function(){return "<object Storage>"}
res.__str__=function(){return "<object Storage>"}
res.__item__=function(rank){return localStorage.key(rank)}
return res
}
}
__BRYTHON__._indexedDB=window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
__BRYTHON__.IDBTransaction=window.IDBTransaction || window.webkitIDBTransaction
__BRYTHON__.IDBKeyRange=window.IDBKeyRange || window.webkitIDBKeyRange
__BRYTHON__.has_indexedDB=typeof(__BRYTHON__._indexedDB)!=="undefined"
if(__BRYTHON__.has_indexedDB){
__BRYTHON__.indexedDB=function(){return __BRYTHON__.JSObject(__BRYTHON__._indexedDB)}
}
__BRYTHON__.re=function(pattern,flags){return__BRYTHON__. JSObject(new RegExp(pattern,flags))}
__BRYTHON__.has_json=typeof(JSON)!=="undefined"
__BRYTHON__.has_websocket=(function(){
try{var x=window.WebSocket;return x!==undefined}
catch(err){return false}
})()
__BRYTHON__.implementation=[2, 0, 0, 'final', 2]
__BRYTHON__.version_info=[3, 3, 0, 'alpha', 0]
__BRYTHON__.builtin_module_names=["posix","builtins",
"crypto_js",
"hashlib",
"javascript",
"json",
"marshal",
"math",
"time",
"_ajax",
"_browser",
"_html",
"_io",
"_jsre",
"_os",
"_posixsubprocess",
"_svg",
"_sys",
"_timer",
"_websocket",
"__random",
"_codecs",
"_collections",
"_dummy_thread",
"_functools",
"_imp",
"_markupbase",
"_random",
"_re",
"_socket",
"_sre",
"_string",
"_struct",
"_sysconfigdata",
"_testcapi",
"_thread",
"_warnings",
"_weakref"]

;(function(){
var js,$pos,res,$op
var $operators={
"//=":"ifloordiv",">>=":"irshift","<<=":"ilshift",
"**=":"ipow","**":"pow","//":"floordiv","<<":"lshift",">>":"rshift",
"+=":"iadd","-=":"isub","*=":"imul","/=":"itruediv",
"%=":"imod","&=":"iand","|=":"ior","^=":"ixor",
"+":"add","-":"sub","*":"mul",
"/":"truediv","%":"mod","&":"and","|":"or","~":"invert",
"^":"xor","<":"lt",">":"gt",
"<=":"le",">=":"ge","==":"eq","!=":"ne",
"or":"or","and":"and", "in":"in", 
"is":"is","not_in":"not_in","is_not":"is_not" 
}
var $oplist=[]
for(var attr in $operators){$oplist.push(attr)}
var $op_order=[['or'],['and'],
['in','not_in'],
['<','<=','>','>=','!=','==','is','is_not'],
['|','^','&'],
['>>','<<'],
['+'],
['-'],
['/','//','%'],
['*'],
['**']
]
var $op_weight={}
var $weight=1
for(var $i=0;$i<$op_order.length;$i++){
for(var $j=0;$j<$op_order[$i].length;$j++){
$op_weight[$op_order[$i][$j]]=$weight
}
$weight++
}
var $augmented_assigns={
"//=":"ifloordiv",">>=":"irshift","<<=":"ilshift",
"**=":"ipow","+=":"iadd","-=":"isub","*=":"imul","/=":"itruediv",
"%=":"imod",
"&=":"iand","|=":"ior","^=":"ixor"
}
function $_SyntaxError(C,msg,indent){
console.log('syntax error '+msg)
var ctx_node=C
while(ctx_node.type!=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var module=tree_node.module
var line_num=tree_node.line_num
__BRYTHON__.line_info=[line_num,module]
if(indent===undefined){
if(msg.constructor===Array){__BRYTHON__.$SyntaxError(module,msg[0],$pos)}
if(msg==="Triple string end not found"){
__BRYTHON__.$SyntaxError(module,'invalid syntax : triple string end not found',$pos)
}
__BRYTHON__.$SyntaxError(module,'invalid syntax',$pos)
}else{throw __BRYTHON__.$IndentationError(module,msg,$pos)}
}
var $first_op_letter=[]
for($op in $operators){
if($first_op_letter.indexOf($op.charAt(0))==-1){
$first_op_letter.push($op.charAt(0))
}
}
function $Node(type){
this.type=type
this.children=[]
this.add=function(child){
this.children.push(child)
child.parent=this
}
this.insert=function(pos,child){
this.children.splice(pos,0,child)
child.parent=this
}
this.toString=function(){return "<object 'Node'>"}
this.show=function(indent){
var res=''
if(this.type==='module'){
for(var i=0;i<this.children.length;i++){
res +=this.children[i].show(indent)
}
}else{
indent=indent || 0
for(var i=0;i<indent;i++){res+=' '}
res +=this.C
if(this.children.length>0){res +='{'}
res +='\n'
for(var i=0;i<this.children.length;i++){
res +='['+i+'] '+this.children[i].show(indent+4)
}
if(this.children.length>0){
for(var i=0;i<indent;i++){res+=' '}
res+='}\n'
}
}
return res
}
this.to_js=function(indent){
this.res=[]
this.unbound=[]
if(this.type==='module'){
for(var i=0;i<this.children.length;i++){
this.res.push(this.children[i].to_js(indent))
this.children[i].js_index=this.res.length+0
}
}else{
indent=indent || 0
var ctx_js=this.C.to_js(indent)
if(ctx_js){
for(var i=0;i<indent;i++){this.res.push(' ')}
this.res.push(ctx_js)
this.js_index=this.res.length+0
if(this.children.length>0){this.res.push('{')}
this.res.push('\n')
for(var i=0;i<this.children.length;i++){
this.res.push(this.children[i].to_js(indent+4))
this.children[i].js_index=this.res.length+0
}
if(this.children.length>0){
for(var i=0;i<indent;i++){this.res.push(' ')}
this.res.push('}\n')
}
}
}
if(this.unbound.length>0){
console.log('unbound '+this.unbound+' res length '+this.res.length)
for(var i=0;i<this.res.length;i++){
console.log('['+i+'] '+this.res[i])
}
}
for(var i=0;i<this.unbound.length;i++){
console.log('  '+this.unbound[i]+' '+this.res[this.unbound[i]])
}
return this.res.join('')
}
this.transform=function(rank){
var res=''
if(this.type==='module'){
this.doc_string=$get_docstring(this)
var i=0
while(i<this.children.length){
var node=this.children[i]
this.children[i].transform(i)
i++
}
}else{
var elt=this.C.tree[0]
if(elt.transform !==undefined){
elt.transform(this,rank)
}
var i=0
while(i<this.children.length){
this.children[i].transform(i)
i++
}
}
}
this.get_ctx=function(){return this.C}
}
var $loop_id=0
function $AbstractExprCtx(C,with_commas){
this.type='abstract_expr'
this.with_commas=with_commas
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return '(abstract_expr '+with_commas+') '+this.tree}
this.to_js=function(){
if(this.type==='list'){return '['+$to_js(this.tree)+']'}
else{return $to_js(this.tree)}
}
}
function $AssertCtx(C){
this.type='assert'
this.toString=function(){return '(assert) '+this.tree}
this.parent=C
this.tree=[]
C.tree.push(this)
this.transform=function(node,rank){
if(this.tree[0].type==='list_or_tuple'){
var condition=this.tree[0].tree[0]
var message=this.tree[0].tree[1]
}else{
var condition=this.tree[0]
var message=null
}
var new_ctx=new $ConditionCtx(node.C,'if')
var not_ctx=new $NotCtx(new_ctx)
not_ctx.tree=[condition]
node.C=new_ctx
var new_node=new $Node('expression')
var js='throw AssertionError("AssertionError")'
if(message !==null){
js='throw AssertionError(str('+message.to_js()+'))'
}
new $NodeJSCtx(new_node,js)
node.add(new_node)
}
}
function $AssignCtx(C){
this.type='assign'
C.parent.tree.pop()
C.parent.tree.push(this)
this.parent=C.parent
this.tree=[C]
if(C.type=='expr' && C.tree[0].type=='call'){
$_SyntaxError(C,["can't assign to function call "])
}
if(C.type=='list_or_tuple'){
for(var i=0;i<C.tree.length;i++){
var assigned=C.tree[i].tree[0]
if(assigned.type=='id'){
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
$check_unbound(assigned,scope,assigned.value)
}
}else if(assigned.type=='call'){
$_SyntaxError(C,["can't assign to function call"])
}
}
}else if(C.type=='assign'){
for(var i=0;i<C.tree.length;i++){
var assigned=C.tree[i].tree[0]
if(assigned.type=='id'){
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
$check_unbound(assigned,scope,assigned.value)
}
}
}
}else{
var assigned=C.tree[0]
if(assigned && assigned.type=='id'){
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
$check_unbound(assigned,scope,assigned.value)
}
}
}
this.toString=function(){return '(assign) '+this.tree[0]+'='+this.tree[1]}
this.transform=function(node,rank){
var left=this.tree[0]
while(left.type==='assign'){
var new_node=new $Node('expression')
var node_ctx=new $NodeCtx(new_node)
node_ctx.tree=[left]
node.parent.insert(rank+1,new_node)
this.tree[0]=left.tree[1]
left=this.tree[0]
}
var left_items=null
if(left.type==='expr' && left.tree.length>1){
var left_items=left.tree
}else if(left.type==='expr' && 
(left.tree[0].type==='list_or_tuple'||left.tree[0].type==='target_list')){
var left_items=left.tree[0].tree
}else if(left.type==='target_list'){
var left_items=left.tree
}else if(left.type==='list_or_tuple'){
var left_items=left.tree
}
var right=this.tree[1]
if(left_items===null){
return
}
var right_items=null
if(right.type==='list'||right.type==='tuple'||
(right.type==='expr' && right.tree.length>1)){
var right_items=right.tree
}
if(right_items!==null){
if(right_items.length>left_items.length){
throw Error('ValueError : too many values to unpack (expected '+left_items.length+')')
}else if(right_items.length<left_items.length){
throw Error('ValueError : need more than '+right_items.length+' to unpack')
}
var new_nodes=[]
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,'void(0)')
new_nodes.push(new_node)
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,'var $temp'+$loop_num+'=[]')
new_nodes.push(new_node)
for(var i=0;i<right_items.length;i++){
var js='$temp'+$loop_num+'.push('+right_items[i].to_js()+')'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
new_nodes.push(new_node)
}
for(var i=0;i<left_items.length;i++){
var new_node=new $Node('expression')
var C=new $NodeCtx(new_node)
left_items[i].parent=C
var assign=new $AssignCtx(left_items[i])
assign.tree[1]=new $JSCode('$temp'+$loop_num+'['+i+']')
new_nodes.push(new_node)
}
node.parent.children.splice(rank,1)
for(var i=new_nodes.length-1;i>=0;i--){
node.parent.insert(rank,new_nodes[i])
}
$loop_num++
}else{
var new_node=new $Node('expression')
var js='var $right'+$loop_num+'=iter('+right.to_js()+');'
js +='var $counter'+$loop_num+'=-1'
new $NodeJSCtx(new_node,js)
var new_nodes=[new_node]
var try_node=new $Node('expression')
try_node.line_num=node.parent.children[rank].line_num
try_node.module=node.parent.children[rank].module
new $NodeJSCtx(try_node,'try')
new_nodes.push(try_node)
for(var i=0;i<left_items.length;i++){
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,'$counter'+$loop_num+'++')
try_node.add(new_node)
var new_node=new $Node('expression')
var C=new $NodeCtx(new_node)
left_items[i].parent=C
var assign=new $AssignCtx(left_items[i])
assign.tree[1]=new $JSCode('__builtins__.next($right'+$loop_num+')')
try_node.add(new_node)
}
var catch_node=new $Node('expression')
new $NodeJSCtx(catch_node,'catch($err'+$loop_num+')')
new_nodes.push(catch_node)
var catch_node1=new $Node('expression')
var js='if($err'+$loop_num+'.__name__=="StopIteration")'
js +='{__BRYTHON__.$pop_exc();throw ValueError("need more than "+'
js +='$counter'+$loop_num+'+" value"+'
js +='($counter'+$loop_num+'>1 ? "s" : "")+" to unpack")}else{throw $err'+$loop_num+'};'
new $NodeJSCtx(catch_node1,js)
catch_node.add(catch_node1)
var exhausted=new $Node('expression')
js='var $exhausted'+$loop_num+'=true;try{__builtins__.next($right'+$loop_num
js +=');$exhausted'+$loop_num+'=false}'
js +='catch(err){if(err.__name__=="StopIteration"){__BRYTHON__.$pop_exc()}}'
js +='if(!$exhausted'+$loop_num+'){throw ValueError('
js +='"too many values to unpack (expected "+($counter'+$loop_num+'+1)+")")}'
new $NodeJSCtx(exhausted,js)
new_nodes.push(exhausted)
node.parent.children.splice(rank,1)
for(var i=new_nodes.length-1;i>=0;i--){
node.parent.insert(rank,new_nodes[i])
}
$loop_num++
}
}
this.to_js=function(){
if(this.parent.type==='call'){
return '__BRYTHON__.$Kw('+this.tree[0].to_js()+','+this.tree[1].to_js()+')'
}else{
var left=this.tree[0]
if(left.type==='expr'){
left=left.tree[0]
}
var right=this.tree[1]
if(left.type==='attribute'){
left.func='setattr'
var res=left.to_js()
left.func='getattr'
res=res.substr(0,res.length-1)
res +=','+right.to_js()+');None;'
return res
}else if(left.type==='sub'){
left.func='setitem' 
var res=left.to_js()
res=res.substr(0,res.length-1)
left.func='getitem' 
res +=','+right.to_js()+');None;'
return res
}
var scope=$get_scope(this)
if(scope.ntype==="module"){
var res='var '+left.to_js()
if(left.to_js().charAt(0)!='$'){
res +='=$globals["'+left.to_js()+'"]'
}
res +='='+right.to_js()+';None;'
return res
}else if(scope.ntype==='def'||scope.ntype==="generator"){
if(scope.globals && scope.globals.indexOf(left.value)>-1){
return left.to_js()+'=$globals["'+left.to_js()+'"]='+right.to_js()
}else{
var scope_id=scope.C.tree[0].id
var locals=__BRYTHON__.scope[scope_id].locals
if(locals.indexOf(left.to_js())===-1){
locals.push(left.to_js())
}
var res='var '+left.to_js()+'='
res +='$locals["'+left.to_js()+'"]='
res +=right.to_js()+';None;'
return res
}
}else if(scope.ntype==='class'){
left.is_left=true 
var attr=left.to_js()
left.in_class='$class.'+attr
return '$class.'+attr+'='+right.to_js()
}
}
}
}
function $AttrCtx(C){
this.type='attribute'
this.value=C.tree[0]
this.parent=C
C.tree.pop()
C.tree.push(this)
this.tree=[]
this.func='getattr' 
this.toString=function(){return '(attr) '+this.value+'.'+this.name}
this.to_js=function(){
var name=this.name
return this.func+'('+this.value.to_js()+',"'+name+'")'
}
}
function $BodyCtx(C){
var ctx_node=C.parent
while(ctx_node.type!=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var body_node=new $Node('expression')
tree_node.insert(0,body_node)
return new $NodeCtx(body_node)
}
function $BreakCtx(C){
this.type='break'
this.toString=function(){return 'break '}
this.parent=C
C.tree.push(this)
var ctx_node=C
while(ctx_node.type!=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var loop_node=tree_node.parent
while(true){
if(loop_node.type==='module'){
$_SyntaxError(C,'break outside of a loop')
}else{
var ctx=loop_node.C.tree[0]
if(ctx.type==='for' ||(ctx.type==='condition' && ctx.token==='while')){
this.loop_ctx=ctx
break
}else if(['def','generator','class'].indexOf(ctx.type)>-1){
$_SyntaxError(C,'break outside of a loop')
}else{
loop_node=loop_node.parent
}
}
}
this.to_js=function(){
return 'var $no_break'+this.loop_ctx.loop_num+'=false;break'
}
}
function $CallArgCtx(C){
this.type='call_arg'
this.toString=function(){return 'call_arg '+this.tree}
this.parent=C
this.start=$pos
this.tree=[]
C.tree.push(this)
this.expect='id'
this.to_js=function(){return $to_js(this.tree)}
}
function $CallCtx(C){
this.type='call'
this.func=C.tree[0]
if(this.func!==undefined){
this.func.parent=this
}
this.parent=C
if(C.type!='class'){
C.tree.pop()
C.tree.push(this)
}else{
C.args=this
}
this.tree=[]
this.start=$pos
this.toString=function(){return '(call) '+this.func+'('+this.tree+')'}
this.to_js=function(){
if(this.tree.length>0){
if(this.tree[this.tree.length-1].tree.length==0){
this.tree.pop()
}
}
if(this.func!==undefined && 
['eval','exec'].indexOf(this.func.value)>-1){
var ctx_node=this
while(ctx_node.parent!==undefined){ctx_node=ctx_node.parent}
var module=ctx_node.node.module
var arg=this.tree[0].to_js()
var ns=''
var _name=module+',exec_'+Math.random().toString(36).substr(2,8)
if(this.tree.length>1){
var arg2=this.tree[1]
if(arg2.tree!==undefined&&arg2.tree.length>0){
arg2=arg2.tree[0]
}
if(arg2.tree!==undefined&&arg2.tree.length>0){
arg2=arg2.tree[0]
}
if(arg2.type==='call'){
if(arg2.func.value==='globals'){
ns='globals'
_name=module
}
}else if(arg2.type==='id'){
ns=arg2.value
}
}
__BRYTHON__.$py_module_path[_name]=__BRYTHON__.$py_module_path[module]
var res='(function(){try{'
res +='\nfor(var $attr in $globals){eval("var "+$attr+"=$globals[$attr]")};'
res +='\nfor(var $attr in $locals){eval("var "+$attr+"=$locals[$attr]")};'
if(ns!=='' && ns!=='globals'){
res +='\nfor(var $i=0;$i<'+ns+'.$keys.length;$i++){'
res +='eval("var "+'+ns+'.$keys[$i]+"='+ns+'.$values[$i]")};'
}
res +='var $jscode = __BRYTHON__.py2js('+arg+',"'+_name+'").to_js();'
res +='if(__BRYTHON__.debug>1){console.log($jscode)};'
res +='var $res = eval($jscode);'
res +='if($res===undefined){return None};return $res'
res +='}catch(err){throw __BRYTHON__.exception(err)}'
res +='})()'
if(ns==='globals'){
res +=';for(var $attr in __BRYTHON__.scope["'+_name+'"].__dict__)'
res +='{$globals[$attr]=__BRYTHON__.scope["'+module+'"].__dict__[$attr]='
res +='__BRYTHON__.scope["'+_name+'"].__dict__[$attr]}'
}else if(ns !=''){
res +=';for(var $attr in __BRYTHON__.scope["'+_name+'"].__dict__)'
res +='{__builtins__.dict.$dict.__setitem__('+ns+',$attr,__BRYTHON__.scope["'+_name+'"].__dict__[$attr])}' 
}else{
res +=';for(var $attr in __BRYTHON__.scope["'+_name+'"].__dict__){'
res +='\nif($attr.search(/[\.]/)>-1){continue}\n'
res +='eval("var "+$attr+"='
res +='$globals[$attr]='
res +='__BRYTHON__.scope[\\"'+module+'\\"].__dict__[$attr]='
res +='__BRYTHON__.scope[\\"'+_name+'\\"].__dict__[$attr]")}'
}
return res
}else if(this.func!==undefined && this.func.value==='classmethod'){
return 'classmethod($class,'+$to_js(this.tree)+')'
}else if(this.func!==undefined && this.func.value==='locals'){
var scope=$get_scope(this),mod=$get_module(this)
if(scope !==null &&(scope.ntype==='def'||scope.ntype=='generator')){
return 'locals("'+scope.C.tree[0].id+'","'+mod.module+'")'
}
}else if(this.func!==undefined && this.func.value==='globals'){
var ctx_node=this
while(ctx_node.parent!==undefined){ctx_node=ctx_node.parent}
var module=ctx_node.node.module
return 'globals("'+module+'")'
}else if(this.func!==undefined && this.func.value==='dir'){
if(this.tree.length==0){
var mod=$get_module(this)
return 'dir(null,"'+mod.module+'")' 
}
}else if(this.func!==undefined && this.func.value=='$$super'){
if(this.tree.length==0){
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
if(scope.parent && scope.parent.C.tree[0].type=='class'){
new $IdCtx(this,scope.parent.C.tree[0].name)
}
}
}
if(this.tree.length==1){
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
var args=scope.C.tree[0].args
if(args.length>0){
new $IdCtx(this,args[0])
}
}
}
}
else if(this.func!==undefined && this.func.type=='unary'){
var op=this.func.op
if(op=='+'){return $to_js(this.tree)}
else if(op=='-'){return 'getattr('+$to_js(this.tree)+',"__neg__")()'}
else if(op=='~'){return 'getattr('+$to_js(this.tree)+',"__invert__")()'}
}
if(this.tree.length>0){
return 'getattr('+this.func.to_js()+',"__call__")('+$to_js(this.tree)+')'
}else{return 'getattr('+this.func.to_js()+',"__call__")()'}
}
}
function $ClassCtx(C){
this.type='class'
this.parent=C
this.tree=[]
C.tree.push(this)
this.expect='id'
this.toString=function(){return '(class) '+this.name+' '+this.tree+' args '+this.args}
this.transform=function(node,rank){
if(this.transformed){return}
this.doc_string=$get_docstring(node)
var instance_decl=new $Node('expression')
var js='var $class={}'
if(__BRYTHON__.debug>0){js='var $class = {$def_line:__BRYTHON__.line_info}'}
new $NodeJSCtx(instance_decl,js)
node.insert(0,instance_decl)
var ret_obj=new $Node('expression')
new $NodeJSCtx(ret_obj,'return $class')
node.insert(node.children.length,ret_obj)
var run_func=new $Node('expression')
new $NodeJSCtx(run_func,')()')
node.parent.insert(rank+1,run_func)
rank++
js='$'+this.name+'.__doc__='+(this.doc_string || 'None')
var ds_node=new $Node('expression')
new $NodeJSCtx(ds_node,js)
node.parent.insert(rank+1,ds_node)
rank++
js='$'+this.name+'.__module__="'+$get_module(this).module+'"'
var mod_node=new $Node('expression')
new $NodeJSCtx(mod_node,js)
node.parent.insert(rank+1,mod_node)
var scope=$get_scope(this)
if(scope.ntype==="module"||scope.ntype!=='class'){
js='var '+this.name
}else{
js='var '+this.name+' = $class.'+this.name
}
js +='=__BRYTHON__.$class_constructor("'+this.name+'",$'+this.name
if(this.args!==undefined){
var arg_tree=this.args.tree,args=[],kw=[]
for(var i=0;i<arg_tree.length;i++){
if(arg_tree[i].tree[0].type=='kwarg'){kw.push(arg_tree[i].tree[0])}
else{args.push(arg_tree[i].to_js())}
}
js +=',tuple(['+args.join(',')+']),['
for(var i=0;i<args.length;i++){
js +='"'+args[i].replace(new RegExp('"','g'),'\\"')+'"'
if(i<args.length-1){js +=','}
}
js +=']'
js+=',['
for(var i=0;i<kw.length;i++){
js+='["'+kw[i].tree[0].value+'",'+kw[i].tree[1].to_js()+']'
if(i<kw.length-1){js+=','}
}
js+=']'
}else{
js +=',tuple([]),[],[]'
}
js +=')'
var cl_cons=new $Node('expression')
new $NodeJSCtx(cl_cons,js)
node.parent.insert(rank+2,cl_cons)
if(scope.ntype==='module'){
js='__BRYTHON__.scope["'+scope.module+'"].__dict__["'
js +=this.name+'"]='+this.name
var w_decl=new $Node('expression')
new $NodeJSCtx(w_decl,js)
node.parent.insert(rank+3,w_decl)
rank++
}
var end_node=new $Node('expression')
new $NodeJSCtx(end_node,'None;')
node.parent.insert(rank+3,end_node)
this.transformed=true
}
this.to_js=function(){
return 'var $'+this.name+'=(function()'
}
}
function $CompIfCtx(C){
this.type='comp_if'
C.parent.intervals.push($pos)
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return '(comp if) '+this.tree}
this.to_js=function(){return $to_js(this.tree)}
}
function $ComprehensionCtx(C){
this.type='comprehension'
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return '(comprehension) '+this.tree}
this.to_js=function(){
var intervals=[]
for(var i=0;i<this.tree.length;i++){
intervals.push(this.tree[i].start)
}
return intervals
}
}
function $CompForCtx(C){
this.type='comp_for'
C.parent.intervals.push($pos)
this.parent=C
this.tree=[]
this.expect='in'
C.tree.push(this)
this.toString=function(){return '(comp for) '+this.tree}
this.to_js=function(){return $to_js(this.tree)}
}
function $CompIterableCtx(C){
this.type='comp_iterable'
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return '(comp iter) '+this.tree}
this.to_js=function(){return $to_js(this.tree)}
}
function $ConditionCtx(C,token){
this.type='condition'
this.token=token
this.parent=C
this.tree=[]
if(token==='while'){this.loop_num=$loop_num;$loop_num++}
C.tree.push(this)
this.toString=function(){return this.token+' '+this.tree}
this.to_js=function(){
var tok=this.token
if(tok==='elif'){tok='else if'}
if(tok==='while'){tok='var $no_break'+this.loop_num+'=true;'+tok}
if(this.tree.length==1){
var res=tok+'(bool('+$to_js(this.tree)+'))'
}else{
var res=tok+'(bool('+this.tree[0].to_js()+'))'
if(this.tree[1].tree.length>0){
res +='{'+this.tree[1].to_js()+'}'
}
}
return res
}
}
function $DecoratorCtx(C){
this.type='decorator'
this.parent=C
C.tree.push(this)
this.tree=[]
this.toString=function(){return '(decorator) '+this.tree}
this.transform=function(node,rank){
var func_rank=rank+1,children=node.parent.children
var decorators=[this.tree]
while(true){
if(func_rank>=children.length){$_SyntaxError(C)}
else if(children[func_rank].C.tree[0].type==='decorator'){
decorators.push(children[func_rank].C.tree[0].tree)
children.splice(func_rank,1)
}else{break}
}
this.dec_ids=[]
for(var i=0;i<decorators.length;i++){
this.dec_ids.push('$'+Math.random().toString(36).substr(2,8))
}
var obj=children[func_rank].C.tree[0]
var callable=children[func_rank].C
var res=obj.name+'=',tail=''
var scope=$get_scope(this)
if(scope !==null && scope.ntype==='class'){
res='$class.'+obj.name+'='
}
for(var i=0;i<decorators.length;i++){
var dec=this.dec_ids[i]
res +=dec+'('
if(decorators[i][0].tree[0].value=='classmethod'){res+='$class,'}
tail +=')'
}
res +=(scope.ntype==='class' ? '$class.' : '')
res +=obj.name+tail
var decor_node=new $Node('expression')
new $NodeJSCtx(decor_node,res)
node.parent.children.splice(func_rank+1,0,decor_node)
this.decorators=decorators
}
this.to_js=function(){
var res=''
for(var i=0;i<this.decorators.length;i++){
res +='var '+this.dec_ids[i]+'='+$to_js(this.decorators[i])+';'
}
return res
}
}
function $DefCtx(C){
this.type='def'
this.name=null
this.parent=C
this.tree=[]
this.id=Math.random().toString(36).substr(2,8)
__BRYTHON__.scope[this.id]=this
this.locals=[]
C.tree.push(this)
this.enclosing=[]
var scope=$get_scope(this)
while(true){
if(scope.ntype=='def' || scope.ntype=='generator'){
this.enclosing.push(scope.C.tree[0].id)
scope=$get_scope(scope.C.tree[0])
}else{break}
}
this.set_name=function(name){
this.name=name
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
if(scope.C.tree[0].locals.indexOf(name)==-1){
scope.C.tree[0].locals.push(name)
}
}
}
this.toString=function(){return 'def '+this.name+'('+this.tree+')'}
this.transform=function(node,rank){
if(this.transformed!==undefined){return}
this.doc_string=$get_docstring(node)
this.rank=rank 
var scope=$get_scope(this)
var required=''
var defaults=[],defs=[],defs1=[]
var after_star=[]
var other_args=null
var other_kw=null
var env=[]
this.args=[]
for(var i=0;i<this.tree[0].tree.length;i++){
var arg=this.tree[0].tree[i]
if(arg.type==='func_arg_id'){
if(arg.tree.length===0){
if(other_args==null){
required+='"'+arg.name+'",'
}else{
after_star.push('"'+arg.name+'"')
}
}else{
defaults.push('"'+arg.name+'"')
defs.push(arg.name+' = '+$to_js(arg.tree))
defs1.push(arg.name+':'+$to_js(arg.tree))
if(arg.tree[0].type==='expr' 
&& arg.tree[0].tree[0].type==='id'){
env.push(arg.tree[0].tree[0].value)
}
}
}else if(arg.type==='func_star_arg'&&arg.op==='*'){other_args='"'+arg.name+'"'}
else if(arg.type==='func_star_arg'&&arg.op==='**'){other_kw='"'+arg.name+'"'}
this.args.push(arg.name)
}
this.env=env
this.defs=defs
if(required.length>0){required=required.substr(0,required.length-1)}
var nodes=[]
var js='var $locals = __BRYTHON__.scope["'+this.id+'"].__dict__={}'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
var js='for(var $var in $defaults){eval("var "+$var+"=$locals[$var]=$defaults[$var]")}'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
for(var i=this.enclosing.length-1;i>=0;i--){
var js='var $ns=__BRYTHON__.scope["'+this.enclosing[i]+'"].__dict__'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
var js='for(var $var in $ns){$locals[$var]=$ns[$var]}'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
}
var js='var $ns=__BRYTHON__.$MakeArgs("'+this.name+'",arguments,['+required+'],'
js +='['+defaults.join(',')+'],'+other_args+','+other_kw+',['+after_star.join(',')+'])'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
var js='for(var $var in $ns){eval("var "+$var+"=$ns[$var]");'
js +='$locals[$var]=$ns[$var]}'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
for(var i=nodes.length-1;i>=0;i--){
node.children.splice(0,0,nodes[i])
}
var def_func_node=new $Node('expression')
new $NodeJSCtx(def_func_node,'return function()')
var try_node=new $Node('expression')
new $NodeJSCtx(try_node,'try')
for(var i=0;i<node.children.length;i++){
try_node.add(node.children[i])
}
def_func_node.add(try_node)
var catch_node=new $Node('expression')
var js='catch(err'+$loop_num+')'
js +='{throw __BRYTHON__.exception(err'+$loop_num+')}'
new $NodeJSCtx(catch_node,js)
node.children=[]
def_func_node.add(catch_node)
node.add(def_func_node)
var ret_node=new $Node('expression')
var txt=')('
for(var i=0;i<this.env.length;i++){
if(scope.ntype=='class'){
txt +='$class.'+this.env[i]+' != undefined ? '
txt +='$class.'+this.env[i]+' : '
}
txt +=this.env[i]
if(i<this.env.length-1){txt +=','}
}
new $NodeJSCtx(ret_node,txt+')')
node.parent.insert(rank+1,ret_node)
var offset=2
js=this.name+'.__name__'
if(scope.ntype==='class'){
js='$class.'+this.name+'.__name__'
}
js +='="'+this.name+'"'
if(scope.ntype==='def'){
js +=';$locals["'+this.name+'"]='+this.name
}
var name_decl=new $Node('expression')
new $NodeJSCtx(name_decl,js)
node.parent.children.splice(rank+offset,0,name_decl)
offset++
if(scope.ntype==='module'){
js='$globals["'+this.name+'"]='+this.name
js +=';'+this.name+".$type='function'"
new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
node.parent.children.splice(rank+offset,0,new_node)
offset++
}
var module=$get_module(this)
var prefix=scope.ntype=='class' ? '$class.' : ''
js=prefix+this.name+'.__module__ = "'+module.module+'"'
new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
node.parent.children.splice(rank+offset,0,new_node)
offset++
js=prefix+this.name+'.__doc__='+(this.doc_string || 'None')
new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
node.parent.children.splice(rank+offset,0,new_node)
offset++
js=prefix+this.name+'.__code__= {__class__:__BRYTHON__.$CodeDict}'
js +=';None;' 
new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
node.parent.children.splice(rank+offset,0,new_node)
offset++
var default_node=new $Node('expression')
new $NodeJSCtx(default_node,'var $defaults = {'+defs1.join(',')+'}')
node.insert(0,default_node)
this.transformed=true
}
this.add_generator_declaration=function(){
var scope=$get_scope(this)
var node=this.parent.node
if(this.type==='generator' && !this.declared){
var offset=2
if(this.decorators !==undefined){offset++}
js='__BRYTHON__.$generator('
if(scope.ntype==='class'){js +='$class.'}
js +='$'+this.name+')'
var gen_node=new $Node('expression')
var ctx=new $NodeCtx(gen_node)
var expr=new $ExprCtx(ctx,'id',false)
var name_ctx=new $IdCtx(expr,this.name)
var assign=new $AssignCtx(expr)
var expr1=new $ExprCtx(assign,'id',false)
var js_ctx=new $NodeJSCtx(assign,js)
expr1.tree.push(js_ctx)
node.parent.insert(this.rank+offset,gen_node)
this.declared=true
}
}
this.to_js=function(){
var scope=$get_scope(this)
var name=this.name
if(this.type==='generator'){name='$'+name}
if(scope.ntype==="module" || scope.ntype!=='class'){
res='var '+name+'= (function ('
}else{
res='$class.'+name+'= (function ('
}
for(var i=0;i<this.env.length;i++){
res+=this.env[i]
if(i<this.env.length-1){res+=','}
}
res +=')'
return res
}
}
function $DelCtx(C){
this.type='del'
this.parent=C
C.tree.push(this)
this.tree=[]
this.toString=function(){return 'del '+this.tree}
this.to_js=function(){
if(this.tree[0].type=='list_or_tuple'){
var res=''
for(var i=0;i<this.tree[0].tree.length;i++){
var subdel=new $DelCtx(C)
subdel.tree=[this.tree[0].tree[i]]
res +=subdel.to_js()+';'
C.tree.pop()
}
this.tree=[]
return res
}else{
var expr=this.tree[0].tree[0]
var scope=$get_scope(this)
function del_name(scope,name){
var js='delete '+name+';'
if(scope.ntype==='module'){
js+='delete $globals["'+name+'"]'
}else if(scope.ntype==="def"||scope.ntype==="generator"){
if(scope.globals && scope.globals.indexOf(name)>-1){
js+='delete $globals["'+name+'"]'
}else{
js+='delete $locals["'+name+'"]'
}
}
return js+';' 
}
if(expr.type==='id'){return del_name(scope,expr.to_js())}
else if(expr.type=='list_or_tuple'){
var res=''
for(var i=0;i<expr.tree.length;i++){
res +=del_name(expr.tree[i].to_js())
}
return res
}else if(expr.type==='sub'){
expr.func='delitem'
js=expr.to_js()
expr.func='getitem'
return js
}else{
if(expr.type==='op'){
$_SyntaxError(this,["can't delete operator"])
}else if(expr.type==='call'){
$_SyntaxError(this,["can't delete function call"])
}else if(expr.type==='attribute'){
return 'delattr('+expr.value.to_js()+',"'+expr.name+'")'
}else{
$_SyntaxError(this,["can't delete "+expr.type])
}
}
}
}
}
function $DictOrSetCtx(C){
this.type='dict_or_set'
this.real='dict_or_set'
this.expect='id'
this.closed=false
this.start=$pos
this.toString=function(){
if(this.real==='dict'){return '(dict) {'+this.items+'}'}
else if(this.real==='set'){return '(set) {'+this.tree+'}'}
else{return '(dict_or_set) {'+this.tree+'}'}
}
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){
if(this.real==='dict'){
var res='__BRYTHON__.$dict(['
for(var i=0;i<this.items.length;i+=2){
res+='['+this.items[i].to_js()+','+this.items[i+1].to_js()+']'
if(i<this.items.length-2){res+=','}
}
return res+'])'+$to_js(this.tree)
}else if(this.real==='set_comp'){return 'set('+$to_js(this.items)+')'+$to_js(this.tree)}
else if(this.real==='dict_comp'){
var key_items=this.items[0].expression[0].to_js()
var value_items=this.items[0].expression[1].to_js()
return '__BRYTHON__.$dict('+$to_js(this.items)+')'+$to_js(this.tree)
}else{return 'set(['+$to_js(this.items)+'])'+$to_js(this.tree)}
}
}
function $DoubleStarArgCtx(C){
this.type='double_star_arg'
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return '**'+this.tree}
this.to_js=function(){return '__BRYTHON__.$pdict('+$to_js(this.tree)+')'}
}
function $ExceptCtx(C){
this.type='except'
this.parent=C
C.tree.push(this)
this.tree=[]
this.expect='id'
this.toString=function(){return '(except) '}
this.to_js=function(){
if(this.tree.length===0){return 'else'}
else if(this.tree.length===1 && this.tree[0].name==='Exception'){
return 'else if(true)'
}else{
var res='else if(__BRYTHON__.is_exc('+this.error_name+',['
for(var i=0;i<this.tree.length;i++){
res+=this.tree[i].to_js()
if(i<this.tree.length-1){res+=','}
}
res +=']))'
return res
}
}
}
function $ExprCtx(C,name,with_commas){
this.type='expr'
this.name=name
this.with_commas=with_commas
this.expect=',' 
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return '(expr '+with_commas+') '+this.tree}
this.to_js=function(arg){
if(this.type==='list'){return '['+$to_js(this.tree)+']'}
else if(this.tree.length===1){return this.tree[0].to_js(arg)}
else{return 'tuple('+$to_js(this.tree)+')'}
}
}
function $ExprNot(C){
this.type='expr_not'
this.toString=function(){return '(expr_not)'}
this.parent=C
this.tree=[]
C.tree.push(this)
}
function $FloatCtx(C,value){
this.type='float'
this.value=value
this.toString=function(){return 'float '+this.value}
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){return 'float('+this.value+')'}
}
function $ForTarget(C){
this.type='for_target'
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return 'for_target'+' '+this.tree}
this.to_js=function(){return $to_js(this.tree)}
}
function $ForExpr(C){
this.type='for'
this.parent=C
this.tree=[]
C.tree.push(this)
this.loop_num=$loop_num
this.toString=function(){return '(for) '+this.tree}
this.transform=function(node,rank){
var new_nodes=[]
var new_node=new $Node('expression')
var target=this.tree[0]
var iterable=this.tree[1]
this.loop_num=$loop_num
new_node.line_num=node.line_num
new_node.module=node.module
var js='var $next'+$loop_num+'=getattr(iter('+iterable.to_js()
js +='),"__next__")'
new $NodeJSCtx(new_node,js)
new_nodes.push(new_node)
new_node=new $Node('expression')
var js='var $no_break'+$loop_num+'=true;while(true)'
new $NodeJSCtx(new_node,js)
new_node.C.loop_num=$loop_num 
new_nodes.push(new_node)
var children=node.children
node.parent.children.splice(rank,1)
for(var i=new_nodes.length-1;i>=0;i--){
node.parent.insert(rank,new_nodes[i])
}
var try_node=new $Node('expression')
new $NodeJSCtx(try_node,'try')
node.insert(0,try_node)
var iter_node=new $Node('expression')
var C=new $NodeCtx(iter_node)
var target_expr=new $ExprCtx(C,'left',true)
target_expr.tree=target.tree
var assign=new $AssignCtx(target_expr)
assign.tree[1]=new $JSCode('$next'+$loop_num+'()')
try_node.add(iter_node)
var catch_node=new $Node('expression')
var js='catch($err){if(__BRYTHON__.is_exc($err,[__builtins__.StopIteration])){__BRYTHON__.$pop_exc();break}'
js +='else{throw($err)}}'
new $NodeJSCtx(catch_node,js)
node.insert(1,catch_node)
node.parent.children[rank+1].children=children
$loop_num++
}
this.to_js=function(){
var iterable=this.tree.pop()
return 'for '+$to_js(this.tree)+' in '+iterable.to_js()
}
}
function $FromCtx(C){
this.type='from'
this.parent=C
this.module=''
this.names=[]
this.aliases={}
C.tree.push(this)
this.expect='module'
this.toString=function(){
var res='(from) '+this.module+' (import) '+this.names 
res +='(as)' + this.aliases
return res
}
this.to_js=function(){
var scope=$get_scope(this)
var mod=$get_module(this).module
if(mod.substr(0,13)==='__main__,exec'){mod='__main__'}
var path=__BRYTHON__.$py_module_path[mod]
var elts=path.split('/')
elts.pop()
path=elts.join('/')
var res=''
var indent=$get_node(this).indent
var head=''
for(var i=0;i<indent;i++){head +=' '}
if(this.module.charAt(0)=='.'){
var parent_module=$get_module(this).module
var parent_path=__BRYTHON__.$py_module_path[parent_module]
var search_path_parts=parent_path.split('/')
var mod=this.module
while(mod && mod.charAt(0)=='.'){
search_path_parts.pop()
mod=mod.substr(1)
}
if(mod){
search_path_parts.push(mod)
}
var search_path=search_path_parts.join('/')
res +="var $mod=__BRYTHON__.$import_list_intra('"+this.module+"','"
res +=__BRYTHON__.$py_module_path[parent_module]
res +="',["
for(var i=0;i<this.names.length;i++){
res +='"'+this.names[i]+'",'
}
res +='])\n'+head
for(var i=0;i<this.names.length;i++){
if(['def','class','module'].indexOf(scope.ntype)>-1){
res +='var '
}
var alias=this.aliases[this.names[i]]||this.names[i]
res +=alias
if(scope.ntype=='def'){
res +='=$locals["'+alias+'"]'
}else if(scope.ntype=='module'){
res +='=$globals["'+alias+'"]'
}
res +='=getattr($mod,"'+this.names[i]+'")\n'
}
}else{
if(this.names[0]=='*'){
res +='__BRYTHON__.$import("'+this.module+'","'+mod+'")\n'
res +=head+'var $mod=__BRYTHON__.imported["'+this.module+'"]\n'
res +=head+'for(var $attr in $mod){\n'
res +="if($attr.substr(0,1)!=='_')\n"+head+"{var $x = 'var '+$attr+'"
if(scope.ntype==="module"){
res +='=__BRYTHON__.scope["'+scope.module+'"].__dict__["'+"'+$attr+'"+'"]'
}
res +='=$mod["'+"'+$attr+'"+'"]'+"'"+'\n'+head+'eval($x)}}'
}else{
res +='__BRYTHON__.$import_from("'+this.module+'",['
for(var i=0;i<this.names.length;i++){
res +='"'+this.names[i]+'",'
}
res +='],"'+mod+'");\n'
for(var i=0;i<this.names.length;i++){
res +=head+'try{var '+(this.aliases[this.names[i]]||this.names[i])
if(scope.ntype==="module"){
res +='=$globals["'
res +=this.aliases[this.names[i]]||this.names[i]
res +='"]'
}
res +='=getattr(__BRYTHON__.imported["'+this.module+'"],"'+this.names[i]+'")}\n'
res +='catch($err'+$loop_num+'){if($err'+$loop_num+'.__class__'
res +='===__builtins__.AttributeError.$dict){$err'+$loop_num+'.__class__'
res +='=__builtins__.ImportError.$dict};throw $err'+$loop_num+'};'
}
}
}
res +='\n'+head+'None;'
return res
}
}
function $FuncArgs(C){
this.type='func_args'
this.parent=C
this.tree=[]
this.names=[]
C.tree.push(this)
this.toString=function(){return 'func args '+this.tree}
this.expect='id'
this.has_default=false
this.has_star_arg=false
this.has_kw_arg=false
this.to_js=function(){return $to_js(this.tree)}
}
function $FuncArgIdCtx(C,name){
this.type='func_arg_id'
this.name=name
this.parent=C
this.parent.names.push(name)
this.tree=[]
C.tree.push(this)
var ctx=C
while(ctx.parent!==undefined){
if(ctx.type==='def'){
ctx.locals.push(name)
break
}
ctx=ctx.parent
}
this.toString=function(){return 'func arg id '+this.name +'='+this.tree}
this.expect='='
this.to_js=function(){return this.name+$to_js(this.tree)}
}
function $FuncStarArgCtx(C,op){
this.type='func_star_arg'
this.op=op
this.parent=C
if(op=='*'){C.has_star_arg=true}
else if(op=='**'){C.has_kw_arg=true}
C.tree.push(this)
this.set_name=function(name){
this.name=name
if(name=='$dummy'){return}
var ctx=C
while(ctx.parent!==undefined){
if(ctx.type==='def'){
ctx.locals.push(name)
break
}
ctx=ctx.parent
}
}
this.toString=function(){return '(func star arg '+this.op+') '+this.name}
}
function $GlobalCtx(C){
this.type='global'
this.parent=C
this.tree=[]
C.tree.push(this)
this.expect='id'
this.toString=function(){return 'global '+this.tree}
this.transform=function(node,rank){
var scope=$get_scope(this)
if(scope.globals===undefined){scope.globals=[]}
for(var i=0;i<this.tree.length;i++){
scope.globals.push(this.tree[i].value)
}
}
this.to_js=function(){return ''}
}
function $check_unbound(assigned,scope,varname){
if(scope.var2node && scope.var2node[varname]){
if(scope.C.tree[0].locals.indexOf(varname)>-1){
return
}
for(var i=0;i<scope.var2node[varname].length;i++){
var ctx=scope.var2node[varname][i]
if(ctx==assigned){
delete scope.var2node[varname]
break
}else{
while(ctx.parent){ctx=ctx.parent}
var ctx_node=ctx.node
var js='throw UnboundLocalError("local variable '+"'"
js +=varname+"'"+' referenced before assignment")'
new $NodeJSCtx(ctx_node,js)
}
}
}
if(scope.C.tree[0].locals.indexOf(varname)==-1){
scope.C.tree[0].locals.push(varname)
}
}
function $IdCtx(C,value,minus){
this.type='id'
this.toString=function(){return '(id) '+this.value+':'+(this.tree||'')}
this.value=value
this.minus=minus
this.parent=C
this.tree=[]
C.tree.push(this)
if(C.parent.type==='call_arg'){
this.call_arg=true
}
var ctx=C
while(ctx.parent!==undefined){
if(['list_or_tuple','dict_or_set','call_arg','def','lambda'].indexOf(ctx.type)>-1){
if(ctx.vars===undefined){ctx.vars=[value]}
else if(ctx.vars.indexOf(value)===-1){ctx.vars.push(value)}
if(this.call_arg&&ctx.type==='lambda'){
if(ctx.locals===undefined){ctx.locals=[value]}
else{ctx.locals.push(value)}
}
}
ctx=ctx.parent
}
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
var _ctx=this.parent
while(_ctx){
if(_ctx.type=='list_or_tuple' && _ctx.is_comp()){return}
_ctx=_ctx.parent
}
if(C.type=='target_list'){
if(C.parent.type=='for'){
$check_unbound(this,scope,value)
}else if(C.parent.type=='comp_for'){
var comprehension=C.parent.parent.parent
if(comprehension.parent && comprehension.parent.type=='call_arg'){
comprehension=comprehension.parent
}
var remove=[]
if(scope.var2node && scope.var2node[value]){
for(var i=0;i<scope.var2node[value].length;i++){
var ctx=scope.var2node[value][i]
while(ctx.parent){
if(ctx===comprehension.parent){
remove.push(i)
break
}
ctx=ctx.parent
}
}
}
for(var i=remove.length-1;i>=0;i--){
scope.var2node[value].splice(i,1)
}
}
}else if(C.type=='expr' && C.parent.type=='comp_if'){
return
}else if(C.type=='global'){
if(scope.globals===undefined){
scope.globals=[value]
}else if(scope.globals.indexOf(value)==-1){
scope.globals.push(value)
}
}else if(scope.globals===undefined || scope.globals.indexOf(value)==-1){
if(scope.var2node===undefined){
scope.var2node={}
scope.var2node[value]=[this]
}else if(scope.var2node[value]===undefined){
scope.var2node[value]=[this]
}else{
scope.var2node[value].push(this)
}
}
}
this.transform=function(node,rank){
console.log('transform id '+value)
var scope=$get_scope(this)
if(scope.ntype==='def' || scope.ntype==='generator'){
var flag=true
var parent=this.parent
while(parent){parent=parent.parent}
if(this.parent.type==='expr' && this.parent.parent.type=='call_arg'){
if(this.parent.parent.tree[0].type==='kwarg'){
var flag=false
}
}
if(flag){
console.log('add '+value+' to scope')
var ctx=this.parent
while(ctx.parent!==undefined){ctx=ctx.parent}
var ctx_node=ctx.node
if(scope.var2node===undefined){
scope.var2node={value:[ctx_node]}
}else if(scope.var2node[value]===undefined){
scope.var2node[value]=[ctx_node]
}else{
scope.var2node[value].push(ctx_node)
}
}
}
}
this.to_js=function(arg){
var val=this.value
if(['print','eval','open'].indexOf(this.value)>-1){val='$'+val}
if(['locals','globals'].indexOf(this.value)>-1){
if(this.parent.type==='call'){
var scope=$get_scope(this)
if(scope.ntype==="module"){new $StringCtx(this.parent,'"__main__"')}
else{
var locals=scope.C.tree[0].locals
var res='{'
for(var i=0;i<locals.length;i++){
res+="'"+locals[i]+"':"+locals[i]
if(i<locals.length-1){res+=','}
}
new $StringCtx(this.parent,res+'}')
}
}
}
var scope=$get_scope(this)
if(scope.ntype=='class' && this.in_class){
return this.in_class
}
if(scope.ntype==='class' && !this.is_left){
var parent=this.parent
while(parent){parent=parent.parent}
if(this.parent.type==='expr' && this.parent.parent.type=='call_arg'){
if(this.parent.parent.tree[0].type=='kwarg'){
return val+$to_js(this.tree,'')
}
}
return '($class["'+val+'"] !==undefined ? $class["'+val+'"] : '+val+')'
}
return val+$to_js(this.tree,'')
}
}
function $ImportCtx(C){
this.type='import'
this.toString=function(){return 'import '+this.tree}
this.parent=C
this.tree=[]
C.tree.push(this)
this.expect='id'
this.to_js=function(){
var scope=$get_scope(this)
var mod=$get_module(this).module
if(mod.substr(0,13)==='__main__,exec'){mod='__main__'}
var path=__BRYTHON__.$py_module_path[mod]
var elts=path.split('/')
elts.pop()
path=elts.join('/')
var res=''
for(var i=0;i<this.tree.length;i++){
res +='__BRYTHON__.$import('+this.tree[i].to_js()+');'
var parts=this.tree[i].name.split('.')
for(var j=0;j<parts.length;j++){
var key=parts.slice(0,j+1).join('.')
var alias=key
if(j==parts.length-1){alias=this.tree[i].alias}
if(alias.search(/\./)==-1){res +='var '}
res +=alias
if(scope.ntype=='def' || scope.ntype==="generator"){
res +='=$locals["'+alias+'"]'
}else if(scope.ntype==="module"){
res +='=$globals["'+alias+'"]'
}
res +='=__BRYTHON__.scope["'+key+'"].__dict__;'
}
}
res +='None;'
return res
}
}
function $ImportedModuleCtx(C,name){
this.type='imported module'
this.toString=function(){return ' (imported module) '+this.name}
this.parent=C
this.name=name
this.alias=name
C.tree.push(this)
this.to_js=function(){
return '"'+this.name+'"'
}
}
function $IntCtx(C,value){
this.type='int'
this.value=value
this.toString=function(){return 'int '+this.value}
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){return this.value}
}
function $JSCode(js){
this.js=js
this.toString=function(){return this.js}
this.to_js=function(){return this.js}
}
function $KwArgCtx(C){
this.type='kwarg'
this.toString=function(){return 'kwarg '+this.tree[0]+'='+this.tree[1]}
this.parent=C.parent
this.tree=[C.tree[0]]
C.parent.tree.pop()
C.parent.tree.push(this)
var value=this.tree[0].value
var ctx=C
while(ctx.parent!==undefined){
if(['list_or_tuple','dict_or_set','call_arg','def','lambda'].indexOf(ctx.type)>-1){
if(ctx.kwargs===undefined){ctx.kwargs=[value]}
else if(ctx.kwargs.indexOf(value)===-1){ctx.kwargs.push(value)}
}
ctx=ctx.parent
}
var scope=$get_scope(this)
if(scope.ntype=='def' || scope.ntype=='generator'){
var ix=null,varname=C.tree[0].value
if(scope.var2node[varname]!==undefined){
for(var i=0;i<scope.var2node[varname].length;i++){
if(scope.var2node[varname][i]==C.tree[0]){
ix=i
break
}
}
scope.var2node[varname].splice(ix,1)
}
}
this.to_js=function(){
var key=this.tree[0].to_js()
if(key.substr(0,2)=='$$'){key=key.substr(2)}
var res='__BRYTHON__.$Kw("'+key+'",'
res +=$to_js(this.tree.slice(1,this.tree.length))+')'
return res
}
}
function $LambdaCtx(C){
this.type='lambda'
this.toString=function(){return '(lambda) '+this.args_start+' '+this.body_start}
this.parent=C
C.tree.push(this)
this.tree=[]
this.args_start=$pos+6
this.vars=[]
this.locals=[]
this.to_js=function(){
var ctx_node=this
while(ctx_node.parent!==undefined){ctx_node=ctx_node.parent}
var module=ctx_node.node.module
var src=document.$py_src[module]
var qesc=new RegExp('"',"g")
var args=src.substring(this.args_start,this.body_start).replace(qesc,'\\"')
var body=src.substring(this.body_start+1,this.body_end).replace(qesc,'\\"')
body=body.replace(/\n/g,' ')
return '__BRYTHON__.$lambda("'+module+'",$globals,$locals,"'+args+'","'+body+'")'
}
}
function $ListOrTupleCtx(C,real){
this.type='list_or_tuple'
this.start=$pos
this.real=real
this.expect='id'
this.closed=false
this.toString=function(){
if(this.real==='list'){return '(list) ['+this.tree+']'}
else if(this.real==='list_comp'||this.real==='gen_expr'){
return '('+this.real+') ['+this.intervals+'-'+this.tree+']'
}else{return '(tuple) ('+this.tree+')'}
}
this.parent=C
this.tree=[]
C.tree.push(this)
this.is_comp=function(){
return['list_comp','gen_expr','dict_or_set_comp'].indexOf(this.real)>-1
}
this.get_src=function(){
var ctx_node=this
while(ctx_node.parent!==undefined){ctx_node=ctx_node.parent}
var module=ctx_node.node.module
return document.$py_src[module]
}
this.to_js=function(){
if(this.real==='list'){return 'list(['+$to_js(this.tree)+'])'}
else if(['list_comp','gen_expr','dict_or_set_comp'].indexOf(this.real)>-1){
var src=this.get_src()
var res='__BRYTHON__.$mkdict($globals,$locals),'
var qesc=new RegExp('"',"g")
for(var i=1;i<this.intervals.length;i++){
var txt=src.substring(this.intervals[i-1],this.intervals[i])
txt=txt.replace(/\n/g,' ')
txt=txt.replace(/\\/g,'\\\\')
txt=txt.replace(qesc,'\\"')
res +='"'+txt+'"'
if(i<this.intervals.length-1){res+=','}
}
if(this.real==='list_comp'){return '__BRYTHON__.$list_comp('+res+')'}
else if(this.real==='dict_or_set_comp'){
if(this.expression.length===1){return '__BRYTHON__.$gen_expr('+res+')'}
else{return '__BRYTHON__.$dict_comp('+res+')'}
}else{return '__BRYTHON__.$gen_expr('+res+')'}
}else if(this.real==='tuple'){
if(this.tree.length===1 && this.has_comma===undefined){return this.tree[0].to_js()}
else{return 'tuple(['+$to_js(this.tree)+'])'}
}
}
}
function $NodeCtx(node){
this.node=node
node.C=this
this.tree=[]
this.type='node'
this.toString=function(){return 'node '+this.tree}
this.to_js=function(){
if(this.tree.length>1){
var new_node=new $Node('expression')
var ctx=new $NodeCtx(new_node)
ctx.tree=[this.tree[1]]
new_node.indent=node.indent+4
this.tree.pop()
node.add(new_node)
}
return $to_js(this.tree)
}
}
function $NodeJSCtx(node,js){
this.node=node
node.C=this
this.type='node_js'
this.tree=[js]
this.toString=function(){return 'js '+js}
this.to_js=function(){return js}
}
function $NonlocalCtx(C){
this.type='global'
this.parent=C
this.tree=[]
C.tree.push(this)
this.expect='id'
this.toString=function(){return 'global '+this.tree}
this.transform=function(node,rank){
var scope=$get_scope(this)
if(scope.globals===undefined){scope.globals=[]}
for(var i=0;i<this.tree.length;i++){
scope.globals.push(this.tree[i].value)
}
}
this.to_js=function(){return ''}
}
function $NotCtx(C){
this.type='not'
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return 'not ('+this.tree+')'}
this.to_js=function(){return '!bool('+$to_js(this.tree)+')'}
}
function $OpCtx(C,op){
this.type='op'
this.op=op
this.toString=function(){return '(op '+this.op+')'+this.tree}
this.parent=C.parent
this.tree=[C]
C.parent.tree.pop()
C.parent.tree.push(this)
this.to_js=function(){
var res
if(this.op==='and'){
res='__BRYTHON__.$test_expr(__BRYTHON__.$test_item('+this.tree[0].to_js()+')&&'
res +='__BRYTHON__.$test_item('+this.tree[1].to_js()+'))'
return res
}else if(this.op==='or'){
res='__BRYTHON__.$test_expr(__BRYTHON__.$test_item('+this.tree[0].to_js()+')||'
res +='__BRYTHON__.$test_item('+this.tree[1].to_js()+'))'
return res
}else if(this.op=='in'){
return '__BRYTHON__.$is_member('+$to_js(this.tree)+')'
}else if(this.op=='not_in'){
return '!__BRYTHON__.$is_member('+$to_js(this.tree)+')'
}else{
res=this.tree[0].to_js()
if(this.op==="is"){
res +='==='+this.tree[1].to_js()
}else if(this.op==="is_not"){
res +='!=='+this.tree[1].to_js()
}else{
res='getattr('+res+',"__'+$operators[this.op]+'__")'
res +='('+this.tree[1].to_js()+')'
}
return res
}
}
}
function $PassCtx(C){
this.type='pass'
this.toString=function(){return '(pass)'}
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){return 'void(0)'}
}
function $RaiseCtx(C){
this.type='raise'
this.toString=function(){return ' (raise) '+this.tree}
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){
if(this.tree.length===0){return '__BRYTHON__.$raise()'}
var exc=this.tree[0]
if(exc.type==='id'){return 'throw '+exc.value+'(None)'}
else if(exc.type==='expr' && exc.tree[0].type==='id'){
return 'throw '+exc.tree[0].value+'(None)'
}else{
while(this.tree.length>1){this.tree.pop()}
return 'throw '+$to_js(this.tree)
}
}
}
function $RawJSCtx(C,js){
C.tree.push(this)
this.parent=C
this.toString=function(){return '(js) '+js}
this.to_js=function(){return js}
}
function $ReturnCtx(C){
this.type='return'
this.toString=function(){return 'return '+this.tree}
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){return 'return '+$to_js(this.tree)}
}
function $SingleKwCtx(C,token){
this.type='single_kw'
this.token=token
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return this.token}
this.to_js=function(){
if(this.token==='finally'){return this.token}
var ctx_node=C
while(ctx_node.type!=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var parent=tree_node.parent
for(var i=0;i<parent.children.length;i++){
if(parent.children[i]===tree_node){
if(i==0){$_SyntaxError(C,"block begins with 'else'")}
var pctx=parent.children[i-1].C
if(pctx.type==='node_js'){var loop=pctx.loop_num}
else{var loop=pctx.tree[0].loop_num}
if(loop!==undefined){return 'if ($no_break'+loop+')'}
else{break}
}
}
return this.token
}
}
function $StarArgCtx(C){
this.type='star_arg'
this.parent=C
this.tree=[]
C.tree.push(this)
this.toString=function(){return '(star arg) '+this.tree}
this.to_js=function(){
return '__BRYTHON__.$ptuple('+$to_js(this.tree)+')'
}
}
function $StringCtx(C,value){
this.type='str'
this.toString=function(){return 'string '+(this.tree||'')}
this.parent=C
this.tree=[value]
this.raw=false
C.tree.push(this)
this.to_js=function(){
var res=''
for(var i=0;i<this.tree.length;i++){
var value=this.tree[i]
if(value.charAt(0)!='b'){
res +=value.replace(/\n/g,'\\n\\\n')
}else{
res +='bytes('
res +=value.substr(1).replace(/\n/g,'\\n\\\n')
res +=')'
}
if(i<this.tree.length-1){res+='+'}
}
return res
}
}
function $SubCtx(C){
this.type='sub'
this.func='getitem' 
this.toString=function(){return '(sub) '+this.tree}
this.value=C.tree[0]
C.tree.pop()
C.tree.push(this)
this.parent=C
this.tree=[]
this.to_js=function(){
var res='getattr('+this.value.to_js()+',"__'+this.func+'__")('
if(this.tree.length===1){
return res+this.tree[0].to_js()+')'
}else{
res +='slice('
for(var i=0;i<this.tree.length;i++){
if(this.tree[i].type==='abstract_expr'){res+='null'}
else{res+=this.tree[i].to_js()}
if(i<this.tree.length-1){res+=','}
}
return res+'))'
}
}
}
function $TargetCtx(C,name){
this.toString=function(){return ' (target) '+this.name}
this.parent=C
this.name=name
this.alias=null
C.tree.push(this)
this.to_js=function(){
return '["'+this.name+'","'+this.alias+'"]'
}
}
function $TargetListCtx(C){
this.type='target_list'
this.parent=C
this.tree=[]
this.expect='id'
C.tree.push(this)
this.toString=function(){return '(target list) '+this.tree}
this.to_js=function(){return $to_js(this.tree)}
}
function $TernaryCtx(C){
this.type='ternary'
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree.push(this)
C.parent=this
this.tree=[C]
this.toString=function(){return '(ternary) '+this.tree}
this.to_js=function(){
var env='{'
var ids=$get_ids(this)
for(var i=0;i<ids.length;i++){
env +='"'+ids[i]+'":'+ids[i]
if(i<ids.length-1){env+=','}
}
env+='}'
var qesc=new RegExp('"',"g")
var args='"'+this.tree[1].to_js().replace(qesc,'\\"')+'","' 
args +=escape(this.tree[0].to_js())+'","' 
args +=escape(this.tree[2].to_js())
return '__BRYTHON__.$ternary('+env+','+args+'")'
}
}
function $TryCtx(C){
this.type='try'
this.parent=C
C.tree.push(this)
this.toString=function(){return '(try) '}
this.transform=function(node,rank){
if(node.parent.children.length===rank+1){
$_SyntaxError(C,"missing clause after 'try' 1")
}else{
var next_ctx=node.parent.children[rank+1].C.tree[0]
if(['except','finally','single_kw'].indexOf(next_ctx.type)===-1){
$_SyntaxError(C,"missing clause after 'try' 2")
}
}
new $NodeJSCtx(node,'__BRYTHON__.$failed'+$loop_num+'=false;try')
var catch_node=new $Node('expression')
new $NodeJSCtx(catch_node,'catch($err'+$loop_num+')')
node.parent.insert(rank+1,catch_node)
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,'__BRYTHON__.$failed'+$loop_num+'=true;if(false){void(0)}')
catch_node.insert(0,new_node)
var pos=rank+2
var has_default=false 
var has_else=false 
while(true){
if(pos===node.parent.children.length){break}
var ctx=node.parent.children[pos].C.tree[0]
if(ctx.type==='except'){
if(has_else){$_SyntaxError(C,"'except' or 'finally' after 'else'")}
ctx.error_name='$err'+$loop_num
if(ctx.tree.length>0 && ctx.tree[0].alias!==null
&& ctx.tree[0].alias!==undefined){
var new_node=new $Node('expression')
var js='var '+ctx.tree[0].alias+'=__BRYTHON__.exception($err'+$loop_num+')'
new $NodeJSCtx(new_node,js)
node.parent.children[pos].insert(0,new_node)
}
catch_node.insert(catch_node.children.length,
node.parent.children[pos])
if(ctx.tree.length===0){
if(has_default){$_SyntaxError(C,'more than one except: line')}
has_default=true
}
node.parent.children.splice(pos,1)
}else if(ctx.type==='single_kw' && ctx.token==='finally'){
if(has_else){$_SyntaxError(C,"'finally' after 'else'")}
pos++
}else if(ctx.type==='single_kw' && ctx.token==='else'){
if(has_else){$_SyntaxError(C,"more than one 'else'")}
has_else=true
var else_body=node.parent.children[pos]
node.parent.children.splice(pos,1)
}else{break}
}
if(!has_default){
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,'else{throw $err'+$loop_num+'}')
catch_node.insert(catch_node.children.length,new_node)
}
if(has_else){
var else_node=new $Node('expression')
new $NodeJSCtx(else_node,'if(!__BRYTHON__.$failed'+$loop_num+')')
for(var i=0;i<else_body.children.length;i++){
else_node.add(else_body.children[i])
}
node.parent.insert(pos,else_node)
}
$loop_num++
}
this.to_js=function(){return 'try'}
}
function $UnaryCtx(C,op){
this.type='unary'
this.op=op
this.toString=function(){return '(unary) '+this.op+' ['+this.tree+']'}
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){return this.op+$to_js(this.tree)}
}
function $WithCtx(C){
this.type='with'
this.parent=C
C.tree.push(this)
this.tree=[]
this.expect='as'
this.toString=function(){return '(with) '}
this.set_alias=function(arg){
var scope=$get_scope(this)
this.tree[this.tree.length-1].alias=arg
if(scope.ntype !=='module'){
scope.C.tree[0].locals.push(arg)
}
}
this.transform=function(node,rank){
if(this.transformed){return}
if(this.tree[0].alias===null){this.tree[0].alias='$temp'}
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,'catch($err'+$loop_num+')')
var fbody=new $Node('expression')
var js='if(!$ctx_manager_exit($err'+$loop_num+'.type,'
js +='$err'+$loop_num+'.value,$err'+$loop_num+'.traceback))'
js +='{throw $err'+$loop_num+'}'
new $NodeJSCtx(fbody,js)
new_node.add(fbody)
node.parent.insert(rank+1,new_node)
$loop_num++
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,'finally')
var fbody=new $Node('expression')
new $NodeJSCtx(fbody,'$ctx_manager_exit(None,None,None)')
new_node.add(fbody)
node.parent.insert(rank+2,new_node)
this.transformed=true
}
this.to_js=function(){
var res='var $ctx_manager='+this.tree[0].to_js()
var scope=$get_scope(this)
res +='\nvar $ctx_manager_exit = getattr($ctx_manager,"__exit__")\n'
if(this.tree[0].alias){
var alias=this.tree[0].alias
res +='var '+this.tree[0].alias+'='
if(scope.ntype=='module'){res +='$globals["'}
else{
res +='$locals["'
scope.C.tree[0].locals.push(alias)
}
res +=alias + '"]='
}
res +='getattr($ctx_manager,"__enter__")()'
return res+'\ntry'
}
}
function $YieldCtx(C){
this.type='yield'
this.toString=function(){return '(yield) '+this.tree}
this.parent=C
this.tree=[]
C.tree.push(this)
this.transform=function(node,rank){
if(this.transformed!==undefined){return}
var scope=$get_scope(node.C.tree[0])
scope.C.tree[0].type='generator'
this.transformed=true
this.func_name=scope.C.tree[0].name
scope.C.tree[0].add_generator_declaration()
}
this.to_js=function(){
var scope=$get_scope(this)
var res=''
if(scope.ntype==='generator'){
scope=$get_scope(scope.C.tree[0])
if(scope.ntype==='class'){res='$class.'}
}
if(this.tree.length==1){
return res+'$'+this.func_name+'.$iter.push('+$to_js(this.tree)+')'
}else{
var indent=$ws($get_module(this).indent)
res +='$subiter'+$loop_num+'=getattr(iter('+this.tree[1].to_js()+'),"__next__")\n'
res +=indent+'while(true){\n'+indent+$ws(4)
res +='try{$'+this.func_name+'.$iter.push('
res +='$subiter'+$loop_num+'())}\n'
res +=indent+$ws(4)+'catch($err'+$loop_num+'){\n'
res +=indent+$ws(8)+'if($err'+$loop_num+'.__class__.$factory===__builtins__.StopIteration)'
res +='{__BRYTHON__.$pop_exc();break}\n'
res +=indent+$ws(8)+'else{throw $err'+$loop_num+'}\n}\n}'
$loop_num++
return res
}
}
}
var $loop_num=0
var $iter_num=0 
function $add_line_num(node,rank){
if(node.type==='module'){
var i=0
while(i<node.children.length){
i +=$add_line_num(node.children[i],i)
}
}else{
var elt=node.C.tree[0],offset=1
var flag=true
if(node.line_num===undefined){flag=false}
if(elt.type==='condition' && elt.token==='elif'){flag=false}
else if(elt.type==='except'){flag=false}
else if(elt.type==='single_kw'){flag=false}
if(flag){
var js='__BRYTHON__.line_info=['+node.line_num+',"'+node.module+'"];'
js +='None;'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
node.parent.insert(rank,new_node)
offset=2
}
var i=0
while(i<node.children.length){
i +=$add_line_num(node.children[i],i)
}
return offset
}
}
function $augmented_assign(C,op){
var func='__'+$operators[op]+'__'
var ctx=C
while(ctx.parent!==undefined){ctx=ctx.parent}
var node=ctx.node
var parent=node.parent
for(var i=0;i<parent.children.length;i++){
if(parent.children[i]===node){var rank=i;break}
}
var new_node=new $Node('expression')
var new_ctx=new $NodeCtx(new_node)
var new_expr=new $ExprCtx(new_ctx,'id',false)
var _id=new $IdCtx(new_expr,'$temp')
var assign=new $AssignCtx(C)
assign.tree[0]=_id
_id.parent=assign
var prefix=''
if(['+=','-=','*=','/='].indexOf(op)>-1 && 
C.type=='expr' && C.tree[0].type=='id'){
var scope=$get_scope(C)
prefix='$locals'
if(scope.ntype=='module'){prefix='$globals'}
else if(['def','generator'].indexOf(scope.ntype)>-1){
if(scope.globals && scope.globals.indexOf(C.tree[0].value)>-1){
prefix='$globals'
}
}
}
var offset=1
if(prefix){
var new_node=new $Node('expression')
var js='if(typeof $temp=="number" && '
js +='typeof '+C.to_js()+'=="number"){'
js +=C.to_js()+op+'$temp'
js +=';'+prefix+'["'+C.tree[0].value+'"]='+C.to_js()
js +='}'
new $NodeJSCtx(new_node,js)
parent.insert(rank+offset,new_node)
offset++
}
var new_node=new $Node('expression')
var js=''
if(prefix){js +='else '}
js +='if(!hasattr('+C.to_js()+',"'+func+'"))'
new $NodeJSCtx(new_node,js)
parent.insert(rank+offset,new_node)
offset ++
var aa1=new $Node('expression')
var ctx1=new $NodeCtx(aa1)
var expr1=new $ExprCtx(ctx1,'clone',false)
expr1.tree=C.tree
for(var i=0;i<expr1.tree.length;i++){
expr1.tree[i].parent=expr1
}
var assign1=new $AssignCtx(expr1)
var new_op=new $OpCtx(expr1,op.substr(0,op.length-1))
new_op.parent=assign1
new $RawJSCtx(new_op,'$temp')
assign1.tree.push(new_op)
expr1.parent.tree.pop()
expr1.parent.tree.push(assign1)
new_node.add(aa1)
var aa2=new $Node('expression')
new $NodeJSCtx(aa2,'else')
parent.insert(rank+offset,aa2)
var aa3=new $Node('expression')
var js3=C.to_js()
if(prefix){js3 +='='+prefix+'["'+C.to_js()+'"]'}
js3 +='=getattr('+C.to_js()
js3 +=',"'+func+'")($temp)'
new $NodeJSCtx(aa3,js3)
aa2.add(aa3)
return new $AbstractExprCtx(assign)
}
function $clear_ns(ctx){
var scope=$get_scope(ctx)
if(scope.ntype=="def" || scope.ntype=="generator"){
if(scope.var2node){
for(var name in scope.var2node){
var remove=[]
for(var j=0;j<scope.var2node[name].length;j++){
var elt=scope.var2node[name][j].parent
while(elt.parent){
if(elt===ctx){remove.push(j);break}
elt=elt.parent
}
}
for(var k=remove.length-1;k>=0;k--){
scope.var2node[name].splice(remove[k],1)
}
}
}
}
}
function $get_docstring(node){
var doc_string='""'
if(node.children.length>0){
var firstchild=node.children[0]
if(firstchild.C.tree && firstchild.C.tree[0].type=='expr'){
if(firstchild.C.tree[0].tree[0].type=='str')
doc_string=firstchild.C.tree[0].tree[0].to_js()
}
}
return doc_string
}
function $get_scope(C){
var ctx_node=C.parent
while(ctx_node.type!=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var scope=null
while(tree_node.parent && tree_node.parent.type!=='module'){
var ntype=tree_node.parent.C.tree[0].type
if(['def','class','generator'].indexOf(ntype)>-1){
scope=tree_node.parent
scope.ntype=ntype
scope.elt=scope.C.tree[0]
return scope
}
tree_node=tree_node.parent
}
scope=tree_node.parent || tree_node 
scope.ntype="module"
scope.elt=scope.module
return scope
}
function $get_module(C){
var ctx_node=C.parent
while(ctx_node.type!=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var scope=null
while(tree_node.parent.type!=='module'){
tree_node=tree_node.parent
}
scope=tree_node.parent 
scope.ntype="module"
return scope
}
function $get_node(C){
var ctx=C
while(ctx.parent){ctx=ctx.parent}
return ctx.node
}
function $get_ids(ctx){
var res=[]
if(ctx.type==='expr' &&
ctx.tree[0].type==='list_or_tuple' &&
ctx.tree[0].real==='list_comp'){return[]}
if(ctx.type==='id'){res.push(ctx.value)}
else if(ctx.type==='attribute'||ctx.type==='sub'){
var res1=$get_ids(ctx.value)
for(var i=0;i<res1.length;i++){
if(res.indexOf(res1[i])===-1){res.push(res1[i])}
}
}else if(ctx.type==='call'){
var res1=$get_ids(ctx.func)
for(var i=0;i<res1.length;i++){
if(res.indexOf(res1[i])===-1){res.push(res1[i])}
}
}
if(ctx.tree!==undefined){
for(var i=0;i<ctx.tree.length;i++){
var res1=$get_ids(ctx.tree[i])
for(var j=0;j<res1.length;j++){
if(res.indexOf(res1[j])===-1){
res.push(res1[j])
}
}
}
}
return res
}
function $ws(n){
var res=''
for(var i=0;i<n;i++){res +=' '}
return res
}
function $to_js(tree,sep){
if(sep===undefined){sep=','}
var res=''
for(var i=0;i<tree.length;i++){
if(tree[i].to_js!==undefined){
res +=tree[i].to_js()
}else{
throw Error('no to_js() for '+tree[i])
}
if(i<tree.length-1){res+=sep}
}
return res
}
var $expr_starters=['id','int','float','str','bytes','[','(','{','not','lambda']
function $arbo(ctx){
while(ctx.parent!=undefined){ctx=ctx.parent}
return ctx
}
function $transition(C,token){
if(C.type==='abstract_expr'){
if($expr_starters.indexOf(token)>-1){
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
}
if(token==='id'){return new $IdCtx(new $ExprCtx(C,'id',commas),arguments[2])}
else if(token==='str'){return new $StringCtx(new $ExprCtx(C,'str',commas),arguments[2])}
else if(token==='bytes'){
return new $StringCtx(new $ExprCtx(C,'bytes',commas),arguments[2])
}
else if(token==='int'){return new $IntCtx(new $ExprCtx(C,'int',commas),arguments[2])}
else if(token==='float'){return new $FloatCtx(new $ExprCtx(C,'float',commas),arguments[2])}
else if(token==='('){return new $ListOrTupleCtx(new $ExprCtx(C,'tuple',commas),'tuple')}
else if(token==='['){return new $ListOrTupleCtx(new $ExprCtx(C,'list',commas),'list')}
else if(token==='{'){return new $DictOrSetCtx(new $ExprCtx(C,'dict_or_set',commas))}
else if(token==='not'){
if(C.type==='op'&&C.op==='is'){
C.op='is_not'
return C
}else{
return new $NotCtx(new $ExprCtx(C,'not',commas))
}
}else if(token==='lambda'){return new $LambdaCtx(new $ExprCtx(C,'lambda',commas))}
else if(token==='op'){
var tg=arguments[2]
if(tg=='+'){tg='\\+'}
if('+-~'.search(tg)>-1){
return new $UnaryCtx(new $ExprCtx(C,'unary',false),arguments[2])
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(token=='='){
$_SyntaxError(C,token)
}else if([')',','].indexOf(token)>-1 && 
['list_or_tuple','call_arg','op'].indexOf(C.parent.type)==-1){
console.log('err token '+token+' type '+C.parent.type)
$_SyntaxError(C,token)
}else{return $transition(C.parent,token,arguments[2])}
}else if(C.type==='assert'){
if(token==='eol'){
return $transition(C.parent,token)
}else{$_SyntaxError(C,token)}
}else if(C.type==='assign'){
if(token==='eol'){return $transition(C.parent,'eol')}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='attribute'){
if(token==='id'){
var name=arguments[2]
C.name=name
return C.parent
}else{$_SyntaxError(C,token)}
}else if(C.type==='break'){
if(token==='eol'){return $transition(C.parent,'eol')}
else{$_SyntaxError(C,token)}
}else if(C.type==='call'){
if(token===','){return C}
else if($expr_starters.indexOf(token)>-1){
if(C.has_dstar){$_SyntaxError(C,token)}
var expr=new $CallArgCtx(C)
return $transition(expr,token,arguments[2])
}else if(token===')'){C.end=$pos;return C.parent}
else if(token==='op'){
var op=arguments[2]
if(op==='-'||op==='~'){return new $UnaryCtx(new $ExprCtx(C,'unary',false),op)}
else if(op==='+'){return C}
else if(op==='*'){C.has_star=true;return new $StarArgCtx(C)}
else if(op==='**'){C.has_dstar=true;return new $DoubleStarArgCtx(C)}
else{throw Error('SyntaxError')}
}else{return $transition(C.parent,token,arguments[2])}
}else if(C.type==='call_arg'){
if($expr_starters.indexOf(token)>-1 && C.expect==='id'){
C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,arguments[2])
}else if(token==='=' && C.expect===','){
return new $ExprCtx(new $KwArgCtx(C),'kw_value',false)
}else if(token==='for'){
$clear_ns(C)
var lst=new $ListOrTupleCtx(C,'gen_expr')
lst.vars=C.vars 
lst.locals=C.locals
lst.intervals=[C.start]
C.tree.pop()
lst.expression=C.tree
C.tree=[lst]
lst.tree=[]
var comp=new $ComprehensionCtx(lst)
return new $TargetListCtx(new $CompForCtx(comp))
}else if(token==='op' && C.expect==='id'){
var op=arguments[2]
C.expect=','
if(op==='+'||op==='-'){
return $transition(new $AbstractExprCtx(C,false),token,op)
}else if(op==='*'){C.expect=',';return new $StarArgCtx(C)}
else if(op==='**'){C.expect=',';return new $DoubleStarArgCtx(C)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(token===')'){
if(C.tree.length>0){
var son=C.tree[C.tree.length-1]
if(son.type==='list_or_tuple'&&son.real==='gen_expr'){
son.intervals.push($pos)
}
}
return $transition(C.parent,token)
}else if(token===':' && C.expect===',' && C.parent.parent.type==='lambda'){
return $transition(C.parent.parent,token)
}else if(token===','&& C.expect===','){
return new $CallArgCtx(C.parent)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='class'){
if(token==='id' && C.expect==='id'){
C.name=arguments[2]
C.expect='(:'
return C
}else if(token==='('){return new $CallCtx(C)}
else if(token===':'){return $BodyCtx(C)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='comp_if'){
return $transition(C.parent,token,arguments[2])
}else if(C.type==='comp_for'){
if(token==='in' && C.expect==='in'){
C.expect=null
return new $AbstractExprCtx(new $CompIterableCtx(C),true)
}else if(C.expect===null){
return $transition(C.parent,token,arguments[2])
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='comp_iterable'){
return $transition(C.parent,token,arguments[2])
}else if(C.type==='comprehension'){
if(token==='if'){return new $AbstractExprCtx(new $CompIfCtx(C),false)}
else if(token==='for'){return new $TargetListCtx(new $CompForCtx(C))}
else{return $transition(C.parent,token,arguments[2])}
}else if(C.type==='condition'){
if(token===':'){return $BodyCtx(C)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='decorator'){
if(token==='id' && C.tree.length===0){
return $transition(new $AbstractExprCtx(C,false),token,arguments[2])
}else if(token==='eol'){return $transition(C.parent,token)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='def'){
if(token==='id'){
if(C.name){
$_SyntaxError(C,'token '+token+' after '+C)
}else{
C.set_name(arguments[2])
return C
}
}else if(token==='('){C.has_args=true;return new $FuncArgs(C)}
else if(token===':' && C.has_args){return $BodyCtx(C)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='del'){
if(token==='eol'){return $transition(C.parent,token)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='dict_or_set'){
if(C.closed){
if(token==='['){return new $SubCtx(C.parent)}
else if(token==='('){return new $CallArgCtx(new $CallCtx(C))}
else if(token==='op'){
return new $AbstractExprCtx(new $OpCtx(C,arguments[2]),false)
}else{return $transition(C.parent,token,arguments[2])}
}else{
if(C.expect===','){
if(token==='}'){
if(C.real==='dict_or_set'&&C.tree.length===1){
C.real='set'
}
if(['set','set_comp','dict_comp'].indexOf(C.real)>-1||
(C.real==='dict'&&C.tree.length%2===0)){
C.items=C.tree
C.tree=[]
C.closed=true
return C
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(token===','){
if(C.real==='dict_or_set'){C.real='set'}
if(C.real==='dict' && C.tree.length%2){
$_SyntaxError(C,'token '+token+' after '+C)
}
C.expect='id'
return C
}else if(token===':'){
if(C.real==='dict_or_set'){C.real='dict'}
if(C.real==='dict'){
C.expect=','
return new $AbstractExprCtx(C,false)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(token==='for'){
$clear_ns(C)
if(C.real==='dict_or_set'){C.real='set_comp'}
else{C.real='dict_comp'}
var lst=new $ListOrTupleCtx(C,'dict_or_set_comp')
lst.intervals=[C.start+1]
lst.vars=C.vars
C.tree.pop()
lst.expression=C.tree
C.tree=[lst]
lst.tree=[]
var comp=new $ComprehensionCtx(lst)
return new $TargetListCtx(new $CompForCtx(comp))
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.expect==='id'){
if(token==='}'){
if(C.tree.length==0){
C.items=[]
C.real='dict'
}else{
C.items=C.tree
}
C.tree=[]
C.closed=true
return C
}else if($expr_starters.indexOf(token)>-1){
C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,arguments[2])
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else{return $transition(C.parent,token,arguments[2])}
}
}else if(C.type==='double_star_arg'){
if($expr_starters.indexOf(token)>-1){
return $transition(new $AbstractExprCtx(C,false),token,arguments[2])
}else if(token===','){return C.parent}
else if(token===')'){return $transition(C.parent,token)}
else if(token===':' && C.parent.parent.type==='lambda'){
return $transition(C.parent.parent,token)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='except'){
if($expr_starters.indexOf(token)>-1 && C.expect==='id'){
C.expect='as'
return $transition(new $AbstractExprCtx(C,false),token,arguments[2])
}else if(token==='as' && C.expect==='as'
&& C.has_alias===undefined){
C.expect='alias'
C.has_alias=true
return C
}else if(token==='id' && C.expect==='alias'){
C.expect=':'
C.tree[0].alias=arguments[2]
return C
}else if(token===':' &&['id','as',':'].indexOf(C.expect)>-1){
return $BodyCtx(C)
}else if(token==='(' && C.expect==='id' && C.tree.length===0){
C.parenth=true
return C
}else if(token===')' &&[',','as'].indexOf(C.expect)>-1){
C.expect='as'
return C
}else if(token===',' && C.parenth!==undefined &&
C.has_alias===undefined &&
['as',','].indexOf(C.expect)>-1){
C.expect='id'
return C
}else{$_SyntaxError(C,'token '+token+' after '+C.expect)}
}else if(C.type==='expr'){
if($expr_starters.indexOf(token)>-1 && C.expect==='expr'){
C.expect=','
return $transition(new $AbstractExprCtx(C,false),token,arguments[2])
}else if(token==='not'&&C.expect===','){
return new $ExprNot(C)
}else if(token==='in'&&C.expect===','){
return $transition(C,'op','in')
}else if(token===',' && C.expect===','){
if(C.with_commas){
C.parent.tree.pop()
var tuple=new $ListOrTupleCtx(C.parent,'tuple')
tuple.implicit=true
tuple.tree=[C]
return tuple
}else{return $transition(C.parent,token)}
}else if(token==='.'){return new $AttrCtx(C)}
else if(token==='['){return new $AbstractExprCtx(new $SubCtx(C),false)}
else if(token==='('){return new $CallCtx(C)}
else if(token==='op'){
var op_parent=C.parent,op=arguments[2]
if(op_parent.type=='ternary' && op_parent.in_else){
var new_op=new $OpCtx(op_parent,op)
return new $AbstractExprCtx(new_op,false)
}
var op1=C.parent,repl=null
while(true){
if(op1.type==='expr'){op1=op1.parent}
else if(op1.type==='op'&&$op_weight[op1.op]>=$op_weight[op]){repl=op1;op1=op1.parent}
else{break}
}
if(repl===null){
if(['and','or'].indexOf(op)>-1){
while(C.parent.type==='not'||
(C.parent.type==='expr'&&C.parent.parent.type==='not')){
C=C.parent
op_parent=C.parent
}
}else{
while(true){
if(C.parent!==op1){
C=C.parent
op_parent=C.parent
}else{
break
}
}
}
C.parent.tree.pop()
var expr=new $ExprCtx(op_parent,'operand',C.with_commas)
expr.expect=','
C.parent=expr
var new_op=new $OpCtx(C,op)
return new $AbstractExprCtx(new_op,false)
}
if(repl.type==='op'
&&['<','<=','==','!=','is','>=','>'].indexOf(repl.op)>-1
&&['<','<=','==','!=','is','>=','>'].indexOf(op)>-1){
repl.parent.tree.pop()
var and_expr=new $OpCtx(repl,'and')
var c2=repl.tree[1]
var c2_clone=new Object()
for(var attr in c2){c2_clone[attr]=c2[attr]}
c2_clone.parent=and_expr
and_expr.tree.push('xxx')
var new_op=new $OpCtx(c2_clone,op)
return new $AbstractExprCtx(new_op,false)
}
repl.parent.tree.pop()
var expr=new $ExprCtx(repl.parent,'operand',false)
expr.tree=[op1]
repl.parent=expr
var new_op=new $OpCtx(repl,op)
return new $AbstractExprCtx(new_op,false)
}else if(token==='augm_assign' && C.expect===','){
return $augmented_assign(C,arguments[2])
}else if(token==='=' && C.expect===','){
if(C.parent.type==="call_arg"){
return new $AbstractExprCtx(new $KwArgCtx(C),true)
}else{
while(C.parent!==undefined){C=C.parent}
C=C.tree[0]
return new $AbstractExprCtx(new $AssignCtx(C),true)
}
}else if(token==='if' && C.parent.type!=='comp_iterable'){
var ctx=C
while(ctx.parent && ctx.parent.type=='op'){
ctx=ctx.parent
if(ctx.type=='expr' && ctx.parent && ctx.parent.type=='op'){
ctx=ctx.parent
}
}
return new $AbstractExprCtx(new $TernaryCtx(ctx),false)
}else{return $transition(C.parent,token)}
}else if(C.type==='expr_not'){
if(token==='in'){
C.parent.tree.pop()
return new $AbstractExprCtx(new $OpCtx(C.parent,'not_in'),false)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='for'){
if(token==='in'){return new $AbstractExprCtx(C,true)}
else if(token===':'){return $BodyCtx(C)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='from'){
if((token==='id'||token==='.')&& C.expect==='module'){
if(token==='id'){C.module +=arguments[2]}
else{C.module +='.'}
return C
}else if(token==='import' && C.expect==='module'){
C.expect='id'
return C
}else if(token==='id' && C.expect==='id'){
C.names.push(arguments[2])
C.expect=','
return C
}else if(token==='op' && arguments[2]==='*' 
&& C.expect==='id'
&& C.names.length===0){
C.names.push('*')
C.expect='eol'
return C
}else if(token===',' && C.expect===','){
C.expect='id'
return C
}else if(token==='eol' && 
(C.expect===',' || C.expect==='eol')){
return $transition(C.parent,token)
}else if(token==='as' &&
(C.expect===',' || C.expect==='eol')){
C.expect='alias'
return C
}else if(token==='id' && C.expect==='alias'){
C.aliases[C.names[C.names.length-1]]=arguments[2]
C.expect=','
return C
}else if(token==='(' && C.expect==='id'){
C.expect='id'
return C
}else if(token===')' && C.expect===','){
C.expect='eol'
return C
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='func_arg_id'){
if(token==='=' && C.expect==='='){
C.parent.has_default=true
return new $AbstractExprCtx(C,false)
}else if(token===',' || token===')'){
if(C.parent.has_default && C.tree.length==0){
$pos -=C.name.length
$_SyntaxError(C,['non-default argument follows default argument'])
}else{
return $transition(C.parent,token)
}
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='func_args'){
if(token==='id' && C.expect==='id'){
C.expect=','
if(C.names.indexOf(arguments[2])>-1){
$_SyntaxError(C,['duplicate argument '+arguments[2]+' in function definition'])
}
return new $FuncArgIdCtx(C,arguments[2])
}else if(token===','){
if(C.has_kw_arg){$_SyntaxError(C,'duplicate kw arg')}
else if(C.expect===','){
C.expect='id'
return C
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(token===')'){
if(C.expect===','){return C.parent}
else if(C.tree.length==0){return C.parent}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(token==='op'){
var op=arguments[2]
C.expect=','
if(op=='*'){
if(C.has_star_arg){$_SyntaxError(C,'duplicate star arg')}
return new $FuncStarArgCtx(C,'*')
}else if(op=='**'){
return new $FuncStarArgCtx(C,'**')
}else{$_SyntaxError(C,'token '+op+' after '+C)}
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='func_star_arg'){
if(token==='id' && C.name===undefined){
if(C.parent.names.indexOf(arguments[2])>-1){
$_SyntaxError(C,['duplicate argument '+arguments[2]+' in function definition'])
}
C.set_name(arguments[2])
C.parent.names.push(arguments[2])
return C.parent
}else if(token==',' && C.name===undefined){
C.set_name('$dummy')
C.parent.names.push('$dummy')
return $transition(C.parent,token)
}else if(token==')'){
C.set_name('$dummy')
C.parent.names.push('$dummy')
return $transition(C.parent,token)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='global'){
if(token==='id' && C.expect==='id'){
new $IdCtx(C,arguments[2])
C.expect=','
return C
}else if(token===',' && C.expect===','){
C.expect='id'
return C
}else if(token==='eol' && C.expect===','){
return $transition(C.parent,token)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='id'){
if(token==='='){
if(C.parent.type==='expr' &&
C.parent.parent !==undefined &&
C.parent.parent.type==='call_arg'){
return new $AbstractExprCtx(new $KwArgCtx(C.parent),false)
}else{return $transition(C.parent,token,arguments[2])}
}else if(token==='op'){
return $transition(C.parent,token,arguments[2])
}else if(['id','str','int','float'].indexOf(token)>-1){
$_SyntaxError(C,'token '+token+' after '+C)
}else{
return $transition(C.parent,token,arguments[2])
}
}else if(C.type==='import'){
if(token==='id' && C.expect==='id'){
new $ImportedModuleCtx(C,arguments[2])
C.expect=','
return C
}else if(token==='.' && C.expect===','){
C.expect='qual'
return C
}else if(token==='id' && C.expect==='qual'){
C.expect=','
C.tree[C.tree.length-1].name +='.'+arguments[2]
C.tree[C.tree.length-1].alias +='.'+arguments[2]
return C
}else if(token===',' && C.expect===','){
C.expect='id'
return C
}else if(token==='as' && C.expect===','){
C.expect='alias'
return C
}else if(token==='id' && C.expect==='alias'){
C.expect=','
C.tree[C.tree.length-1].alias=arguments[2]
var mod_name=C.tree[C.tree.length-1].name
__BRYTHON__.$py_module_alias[mod_name]=arguments[2]
return C
}else if(token==='eol' && C.expect===','){
return $transition(C.parent,token)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='int'||C.type==='float'){
if($expr_starters.indexOf(token)>-1){
$_SyntaxError(C,'token '+token+' after '+C)
}else{return $transition(C.parent,token,arguments[2])}
}else if(C.type==='kwarg'){
if(token===','){return new $CallArgCtx(C.parent.parent)}
else{return $transition(C.parent,token)}
}else if(C.type==="lambda"){
if(token===':' && C.args===undefined){
C.args=C.tree
C.tree=[]
C.body_start=$pos
return new $AbstractExprCtx(C,false)
}else if(C.args!==undefined){
C.body_end=$pos
return $transition(C.parent,token)
}else if(C.args===undefined){
return $transition(new $CallCtx(C),token,arguments[2])
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='list_or_tuple'){
if(C.closed){
if(token==='['){return new $SubCtx(C.parent)}
else if(token==='('){return new $CallCtx(C)}
else if(token==='op'){
return new $AbstractExprCtx(new $OpCtx(C,arguments[2]),false)
}
else{return $transition(C.parent,token,arguments[2])}
}else{
if(C.expect===','){
if((C.real==='tuple'||C.real==='gen_expr')
&& token===')'){
C.closed=true
if(C.real==='gen_expr'){C.intervals.push($pos)}
return C.parent
}else if((C.real==='list'||C.real==='list_comp')
&& token===']'){
C.closed=true
if(C.real==='list_comp'){C.intervals.push($pos)}
return C
}else if(C.real==='dict_or_set_comp' && token==='}'){
C.intervals.push($pos)
return $transition(C.parent,token)
}else if(token===','){
if(C.real==='tuple'){C.has_comma=true}
C.expect='id'
return C
}else if(token==='for'){
if(C.real==='list'){C.real='list_comp'}
else{C.real='gen_expr'}
$clear_ns(C)
C.intervals=[C.start+1]
C.expression=C.tree
C.tree=[]
var comp=new $ComprehensionCtx(C)
return new $TargetListCtx(new $CompForCtx(comp))
}else{return $transition(C.parent,token,arguments[2])}
}else if(C.expect==='id'){
if(C.real==='tuple' && token===')'){
C.closed=true
return C.parent
}else if(C.real==='gen_expr' && token===')'){
C.closed=true
return $transition(C.parent,token)
}else if(C.real==='list'&& token===']'){
C.closed=true
return C
}else if(token=='eol' && C.real=='tuple' && 
C.implicit===true){
C.closed=true
return $transition(C.parent,token)
}else if(token !==')'&&token!==']'&&token!==','){
C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,arguments[2])
}else if(token==','){
$_SyntaxError(C,'unexpected comma inside list')
}
}else{return $transition(C.parent,token,arguments[2])}
}
}else if(C.type==='list_comp'){
if(token===']'){return C.parent}
else if(token==='in'){return new $ExprCtx(C,'iterable',true)}
else if(token==='if'){return new $ExprCtx(C,'condition',true)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='node'){
if($expr_starters.indexOf(token)>-1){
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,arguments[2])
}else if(token==="op" && '+-~'.search(arguments[2])>-1){
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,arguments[2])
}else if(token==='class'){return new $ClassCtx(C)}
else if(token==='break'){return new $BreakCtx(C)}
else if(token==='def'){return new $DefCtx(C)}
else if(token==='for'){return new $TargetListCtx(new $ForExpr(C))}
else if(['if','elif','while'].indexOf(token)>-1){
return new $AbstractExprCtx(new $ConditionCtx(C,token),false)
}else if(['else','finally'].indexOf(token)>-1){
return new $SingleKwCtx(C,token)
}else if(token==='try'){return new $TryCtx(C)}
else if(token==='except'){return new $ExceptCtx(C)}
else if(token==='assert'){return new $AbstractExprCtx(new $AssertCtx(C),'assert',true)}
else if(token==='from'){return new $FromCtx(C)}
else if(token==='import'){return new $ImportCtx(C)}
else if(token==='global'){return new $GlobalCtx(C)}
else if(token==='nonlocal'){return new $NonlocalCtx(C)}
else if(token==='lambda'){return new $LambdaCtx(C)}
else if(token==='pass'){return new $PassCtx(C)}
else if(token==='raise'){return new $RaiseCtx(C)}
else if(token==='return'){
var ret=new $ReturnCtx(C)
return new $AbstractExprCtx(ret,true)
}else if(token==="with"){return new $AbstractExprCtx(new $WithCtx(C),false)}
else if(token==='yield'){
var yield=new $YieldCtx(C)
return new $AbstractExprCtx(yield,true)
}else if(token==='del'){return new $AbstractExprCtx(new $DelCtx(C),true)}
else if(token==='@'){return new $DecoratorCtx(C)}
else if(token==='eol'){
if(C.tree.length===0){
C.node.parent.children.pop()
return C.node.parent.C
}
return C
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='not'){
if(token==='in'){
C.parent.parent.tree.pop()
return new $ExprCtx(new $OpCtx(C.parent,'not_in'),'op',false)
}else if($expr_starters.indexOf(token)>-1){
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,arguments[2])
}else{return $transition(C.parent,token)}
}else if(C.type==='op'){
if($expr_starters.indexOf(token)>-1){
return $transition(new $AbstractExprCtx(C,false),token,arguments[2])
}else if(token==='op' && '+-~'.search(arguments[2])>-1){
return new $UnaryCtx(C,arguments[2])
}else{return $transition(C.parent,token)}
}else if(C.type==='pass'){
if(token==='eol'){return C.parent}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='raise'){
if(token==='id' && C.tree.length===0){
return new $IdCtx(new $ExprCtx(C,'exc',false),arguments[2])
}else if(token=='from' && C.tree.length>0){
return new $AbstractExprCtx(C,false)
}else if(token==='eol'){
return $transition(C.parent,token)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='return'){
return $transition(C.parent,token)
}else if(C.type==='single_kw'){
if(token===':'){return $BodyCtx(C)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='star_arg'){
if($expr_starters.indexOf(token)>-1){
return $transition(new $AbstractExprCtx(C,false),token,arguments[2])
}else if(token===','){return $transition(C.parent,token)}
else if(token===')'){return $transition(C.parent,token)}
else if(token===':' && C.parent.parent.type==='lambda'){
return $transition(C.parent.parent,token)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='str'){
if(token==='['){return new $AbstractExprCtx(new $SubCtx(C.parent),false)}
else if(token==='('){return new $CallCtx(C)}
else if(token=='str'){
C.tree.push(arguments[2])
return C
}else{return $transition(C.parent,token,arguments[2])}
}else if(C.type==='sub'){
if($expr_starters.indexOf(token)>-1){
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,arguments[2])
}else if(token===']'){return C.parent}
else if(token===':'){
return new $AbstractExprCtx(C,false)
}else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='target_list'){
if(token==='id' && C.expect==='id'){
C.expect=','
new $IdCtx(C,arguments[2])
return C
}else if((token==='('||token==='[')&&C.expect==='id'){
C.expect=','
return new $TargetListCtx(C)
}else if((token===')'||token===']')&&C.expect===','){
return C.parent
}else if(token===',' && C.expect==','){
C.expect='id'
return C
}else if(C.expect===','){return $transition(C.parent,token,arguments[2])}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='ternary'){
if(token==='else'){
C.in_else=true
return new $AbstractExprCtx(C,false)
}else{return $transition(C.parent,token,arguments[2])}
}else if(C.type==='try'){
if(token===':'){return $BodyCtx(C)}
else{$_SyntaxError(C,'token '+token+' after '+C)}
}else if(C.type==='unary'){
if(['int','float'].indexOf(token)>-1){
C.parent.parent.tree.pop()
var value=arguments[2]
if(C.op==='-'){value="-"+value}
if(C.op==='~'){value=~value}
return $transition(C.parent.parent,token,value)
}else if(token==='id'){
C.parent.parent.tree.pop()
var expr=new $ExprCtx(C.parent.parent,'call',false)
var expr1=new $ExprCtx(expr,'id',false)
new $IdCtx(expr1,arguments[2])
if(C.op !=='+'){
var repl=new $AttrCtx(expr)
if(C.op==='-'){repl.name='__neg__'}
else{repl.name='__invert__'}
var call=new $CallCtx(expr)
return expr1
}
return C.parent
}else if(token==="op" && '+-'.search(arguments[2])>-1){
var op=arguments[2]
if(C.op===op){C.op='+'}else{C.op='-'}
return C
}else{return $transition(C.parent,token,arguments[2])}
}else if(C.type==='with'){
if(token==='id' && C.expect==='id'){
new $TargetCtx(C,arguments[2])
C.expect='as'
return C
}else if(token==='as' && C.expect==='as'
&& C.has_alias===undefined 
&& C.tree.length===1){
C.expect='alias'
C.has_alias=true
return C
}else if(token==='id' && C.expect==='alias'){
if(C.parenth!==undefined){C.expect=','}
else{C.expect=':'}
C.set_alias(arguments[2])
return C
}else if(token===':' &&['id','as',':'].indexOf(C.expect)>-1){
return $BodyCtx(C)
}else if(token==='(' && C.expect==='id' && C.tree.length===0){
C.parenth=true
return C
}else if(token===')' &&[',','as'].indexOf(C.expect)>-1){
C.expect=':'
return C
}else if(token===',' && C.parenth!==undefined &&
C.has_alias===undefined &&
['as',','].indexOf(C.expect)>-1){
C.expect='id'
return C
}else{$_SyntaxError(C,'token '+token+' after '+C.expect)}
}else if(C.type==='yield'){
if(token=='from'){
return new $AbstractExprCtx(C,true)
}
return $transition(C.parent,token)
}
}
__BRYTHON__.forbidden=['alert','case','catch','constructor','Date','delete',
'default','document','Error','history','function','location','Math','new','Number','RegExp',
'this','throw','var','super','window']
function $tokenize(src,module,parent){
var delimiters=[["#","\n","comment"],['"""','"""',"triple_string"],
["'","'","string"],['"','"',"string"],
["r'","'","raw_string"],['r"','"',"raw_string"]]
var br_open={"(":0,"[":0,"{":0}
var br_close={")":"(","]":"[","}":"{"}
var br_stack=""
var br_pos=new Array()
var kwdict=["class","return","break",
"for","lambda","try","finally","raise","def","from",
"nonlocal","while","del","global","with",
"as","elif","else","if","yield","assert","import",
"except","raise","in","not","pass","with"
]
var unsupported=[]
var $indented=['class','def','for','condition','single_kw','try','except','with']
var punctuation={',':0,':':0}
var int_pattern=new RegExp("^\\d+")
var float_pattern1=new RegExp("^\\d+\\.\\d*([eE][+-]?\\d+)?")
var float_pattern2=new RegExp("^\\d+([eE][+-]?\\d+)")
var hex_pattern=new RegExp("^0[xX]([0-9a-fA-F]+)")
var octal_pattern=new RegExp("^0[oO]([0-7]+)")
var binary_pattern=new RegExp("^0[bB]([01]+)")
var id_pattern=new RegExp("[\\$_a-zA-Z]\\w*")
var qesc=new RegExp('"',"g")
var sqesc=new RegExp("'","g")
var C=null
var root=new $Node('module')
root.module=module
root.parent=parent
root.indent=-1
var new_node=new $Node('expression')
var current=root
var name=""
var _type=null
var pos=0
indent=null
var lnum=1
while(pos<src.length){
var flag=false
var car=src.charAt(pos)
if(indent===null){
var indent=0
while(pos<src.length){
if(src.charAt(pos)==" "){indent++;pos++}
else if(src.charAt(pos)=="\t"){
indent++;pos++
while(indent%8>0){indent++}
}else{break}
}
if(src.charAt(pos)=='\n'){pos++;lnum++;indent=null;continue}
else if(src.charAt(pos)==='#'){
var offset=src.substr(pos).search(/\n/)
if(offset===-1){break}
pos+=offset+1;lnum++;indent=null;continue
}
new_node.indent=indent
new_node.line_num=lnum
new_node.module=module
if(indent>current.indent){
if(C!==null){
if($indented.indexOf(C.tree[0].type)==-1){
$pos=pos
$_SyntaxError(C,'unexpected indent1',pos)
}
}
current.add(new_node)
}else if(indent<=current.indent &&
$indented.indexOf(C.tree[0].type)>-1 &&
C.tree.length<2){
$pos=pos
$_SyntaxError(C,'expected an indented block',pos)
}else{
while(indent!==current.indent){
current=current.parent
if(current===undefined || indent>current.indent){
$pos=pos
$_SyntaxError(C,'unexpected indent2',pos)
}
}
current.parent.add(new_node)
}
current=new_node
C=new $NodeCtx(new_node)
continue
}
if(car=="#"){
var end=src.substr(pos+1).search('\n')
if(end==-1){end=src.length-1}
pos +=end+1;continue
}
if(car=='"' || car=="'"){
var raw=C.type=='str' && C.raw,
bytes=false ,
end=null
if(name.length>0){
if(name.toLowerCase()=="r"){
raw=true;name=''
}else if(name.toLowerCase()=='u'){
name=''
}else if(name.toLowerCase()=='b'){
bytes=true;name=''
}else if(['rb','br'].indexOf(name.toLowerCase())>-1){
bytes=true;raw=true;name=''
}
}
if(src.substr(pos,3)==car+car+car){_type="triple_string";end=pos+3}
else{_type="string";end=pos+1}
var escaped=false
var zone=car
var found=false
while(end<src.length){
if(escaped){
zone+=src.charAt(end)
if(raw && src.charAt(end)=='\\'){zone+='\\'}
escaped=false;end+=1
}else if(src.charAt(end)=="\\"){
if(raw){
if(end<src.length-1 && src.charAt(end+1)==car){
zone +='\\\\'+car
end +=2
}else{
zone +='\\\\'
end++
}
escaped=true
}else{
if(src.charAt(end+1)=='\n'){
end +=2
lnum++
}else{
zone+='\\' 
escaped=true;end+=1
}
}
}else if(src.charAt(end)==car){
if(_type=="triple_string" && src.substr(end,3)!=car+car+car){
zone +=src.charAt(end)
end++
}else{
found=true
$pos=pos
var $string=zone.substr(1),string=''
for(var i=0;i<$string.length;i++){
var $car=$string.charAt(i)
if($car==car &&
(raw ||(i==0 || $string.charAt(i-1)!=='\\'))){
string +='\\'
}
string +=$car
}
if(bytes){
C=$transition(C,'str','b'+car+string+car)
}else{
C=$transition(C,'str',car+string+car)
}
C.raw=raw
pos=end+1
if(_type=="triple_string"){pos=end+3}
break
}
}else{
zone +=src.charAt(end)
if(src.charAt(end)=='\n'){lnum++}
end++
}
}
if(!found){
if(_type==="triple_string"){
$_SyntaxError(C,"Triple string end not found")
}else{
$_SyntaxError(C,"String end not found")
}
}
continue
}
if(name==""){
if(car.search(/[a-zA-Z_]/)!=-1){
name=car 
pos++;continue
}
}else{
if(car.search(/\w/)!=-1){
name+=car
pos++;continue
}else{
if(kwdict.indexOf(name)>-1){
$pos=pos-name.length
if(unsupported.indexOf(name)>-1){
$_SyntaxError(C,"Unsupported Python keyword '"+name+"'")
}
if(name=='not'){
var re=/^\s+in\s+/
var res=re.exec(src.substr(pos))
if(res!==null){
pos +=res[0].length
C=$transition(C,'op','not_in')
}else{
C=$transition(C,name)
}
}else{
C=$transition(C,name)
}
}else if($oplist.indexOf(name)>-1){
$pos=pos-name.length
C=$transition(C,'op',name)
}else{
if(__BRYTHON__.forbidden.indexOf(name)>-1){name='$$'+name}
$pos=pos-name.length
C=$transition(C,'id',name)
}
name=""
continue
}
}
if(car=="."){
if(pos<src.length-1 && '0123456789'.indexOf(src.charAt(pos+1))>-1){
src=src.substr(0,pos)+'0'+src.substr(pos)
continue
}
$pos=pos
C=$transition(C,'.')
pos++;continue
}
if(car==="0"){
var res=hex_pattern.exec(src.substr(pos))
if(res){
C=$transition(C,'int',parseInt(res[1],16))
pos +=res[0].length
continue
}
var res=octal_pattern.exec(src.substr(pos))
if(res){
C=$transition(C,'int',parseInt(res[1],8))
pos +=res[0].length
continue
}
var res=binary_pattern.exec(src.substr(pos))
if(res){
C=$transition(C,'int',parseInt(res[1],2))
pos +=res[0].length
continue
}
}
if(car.search(/\d/)>-1){
var res=float_pattern1.exec(src.substr(pos))
if(res){
if(res[0].search(/[eE]/)>-1){
$pos=pos
C=$transition(C,'float',res[0])
}else{
$pos=pos
C=$transition(C,'float',res[0])
}
}else{
res=float_pattern2.exec(src.substr(pos))
if(res){
$pos=pos
C=$transition(C,'float',res[0])
}else{
res=int_pattern.exec(src.substr(pos))
$pos=pos
C=$transition(C,'int',res[0])
}
}
pos +=res[0].length
continue
}
if(car=="\n"){
lnum++
if(br_stack.length>0){
pos++;continue
}else{
if(current.C.tree.length>0){
$pos=pos
C=$transition(C,'eol')
indent=null
new_node=new $Node()
}else{
new_node.line_num=lnum
}
pos++;continue
}
}
if(car in br_open){
br_stack +=car
br_pos[br_stack.length-1]=[C,pos]
$pos=pos
C=$transition(C,car)
pos++;continue
}
if(car in br_close){
if(br_stack==""){
$_SyntaxError(C,"Unexpected closing bracket")
}else if(br_close[car]!=br_stack.charAt(br_stack.length-1)){
$_SyntaxError(C,"Unbalanced bracket")
}else{
br_stack=br_stack.substr(0,br_stack.length-1)
$pos=pos
C=$transition(C,car)
pos++;continue
}
}
if(car=="="){
if(src.charAt(pos+1)!="="){
$pos=pos
C=$transition(C,'=')
pos++;continue
}else{
$pos=pos
C=$transition(C,'op','==')
pos+=2;continue
}
}
if(car in punctuation){
$pos=pos
C=$transition(C,car)
pos++;continue
}
if(car===";"){
$transition(C,'eol')
if(current.C.tree.length===0){
$pos=pos
$_SyntaxError(C,'invalid syntax')
}
var pos1=pos+1
var ends_line=false
while(pos1<src.length){
if(src.charAt(pos1)=='\n' || src.charAt(pos1)=='#'){
ends_line=true;break
}
else if(src.charAt(pos1)==' '){pos1++}
else{break}
}
if(ends_line){pos++;continue}
new_node=new $Node()
new_node.indent=current.indent
new_node.line_num=lnum
new_node.module=module
current.parent.add(new_node)
current=new_node
C=new $NodeCtx(new_node)
pos++;continue
}
if($first_op_letter.indexOf(car)>-1){
var op_match=""
for(var op_sign in $operators){
if(op_sign==src.substr(pos,op_sign.length)
&& op_sign.length>op_match.length){
op_match=op_sign
}
}
$pos=pos
if(op_match.length>0){
if(op_match in $augmented_assigns){
C=$transition(C,'augm_assign',op_match)
}else{
C=$transition(C,'op',op_match)
}
pos +=op_match.length
continue
}
}
if(car=='\\' && src.charAt(pos+1)=='\n'){
lnum++;pos+=2;continue
}
if(car=='@'){
$pos=pos
C=$transition(C,car)
pos++;continue
}
if(car!=' '&&car!=='\t'){$pos=pos;$_SyntaxError(C,'unknown token ['+car+']')}
pos +=1
}
if(br_stack.length!=0){
var br_err=br_pos[0]
$pos=br_err[1]
$_SyntaxError(br_err[0],["Unbalanced bracket "+br_stack.charAt(br_stack.length-1)])
}
if(C!==null && $indented.indexOf(C.tree[0].type)>-1){
$pos=pos-1
$_SyntaxError(C,'expected an indented block',pos)
}
return root
}
__BRYTHON__.py2js=function(src,module,parent){
var src=src.replace(/\r\n/gm,'\n')
while(src.length>0 &&(src.charAt(0)=="\n" || src.charAt(0)=="\r")){
src=src.substr(1)
}
if(src.charAt(src.length-1)!="\n"){src+='\n'}
if(module===undefined){module='__main__'}
var __name__=module
if(__BRYTHON__.scope[module]===undefined){
__BRYTHON__.scope[module]={}
__BRYTHON__.scope[module].__dict__={}
}
document.$py_src[module]=src
var root=$tokenize(src,module,parent)
root.transform()
var js='var $globals = __BRYTHON__.scope["'+module+'"].__dict__\nvar $locals = $globals\n'
js +='var __builtins__ = __BRYTHON__.builtins;\n'
js +='for(var $py_builtin in __builtins__)'
js +='{eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}\n'
var new_node=new $Node('expression')
new $NodeJSCtx(new_node,js)
root.insert(0,new_node)
var ds_node=new $Node('expression')
new $NodeJSCtx(ds_node,'var __doc__=$globals["__doc__"]='+root.doc_string)
root.insert(1,ds_node)
var name_node=new $Node('expression')
var lib_module=module
if(module.substr(0,9)=='__main__,'){lib_module='__main__'}
new $NodeJSCtx(name_node,'var __name__=$globals["__name__"]="'+lib_module+'"')
root.insert(2,name_node)
var file_node=new $Node('expression')
new $NodeJSCtx(file_node,'var __file__=$globals["__file__"]="'+__BRYTHON__.$py_module_path[module]+'"')
root.insert(3,file_node)
if(__BRYTHON__.debug>0){$add_line_num(root,null,module)}
__BRYTHON__.modules[module]=root
return root
}
function brython(options){
document.$py_src={}
__BRYTHON__.$py_module_path={}
__BRYTHON__.$py_module_alias={}
__BRYTHON__.path_hooks=[]
__BRYTHON__.modules={}
__BRYTHON__.imported={}
__BRYTHON__.$options={}
__BRYTHON__.$py_next_hash=-Math.pow(2,53)
if(options===undefined){options={'debug':0}}
if(typeof options==='number'){options={'debug':options}}
__BRYTHON__.$options.debug=__BRYTHON__.debug=options.debug
if(options.open !==undefined){__BRYTHON__.builtins.$open=options.open}
__BRYTHON__.builtins.$CORS=false 
if(options.CORS !==undefined){__BRYTHON__.builtins.$CORS=options.CORS}
__BRYTHON__.$options=options
__BRYTHON__.exception_stack=[]
__BRYTHON__.call_stack=[]
__BRYTHON__.scope={}
__BRYTHON__.events=__BRYTHON__.builtins.dict()
if(options.py_id!==undefined){
	 var $elts=document.getElementById(options.py_id)
}else{
	 var $elts=document.getElementsByTagName('script')
}
var $scripts=document.getElementsByTagName('script')
var $href=window.location.href
var $href_elts=$href.split('/')
$href_elts.pop()
var $script_path=$href_elts.join('/')
__BRYTHON__.path=[]
if(options.pythonpath!==undefined){
__BRYTHON__.path=options.pythonpath
}
if(options.re_module !==undefined){
if(options.re_module=='pyre' || options.re_module=='jsre'){
__BRYTHON__.$options.re=options.re
}
}
if(!(__BRYTHON__.path.indexOf($script_path)> -1)){
__BRYTHON__.path.push($script_path)
}
for(var $i=0;$i<$scripts.length;$i++){
var $elt=$scripts[$i]
var $br_scripts=['brython.js','py2js.js','brython_dist.js']
for(var $j=0;$j<$br_scripts.length;$j++){
var $bs=$br_scripts[$j]
if($elt.src && $elt.src.substr($elt.src.length-$bs.length)==$bs){
if($elt.src.length===$bs.length ||
$elt.src.charAt($elt.src.length-$bs.length-1)=='/'){
var $path=$elt.src.substr(0,$elt.src.length-$bs.length)
__BRYTHON__.brython_path=$path
if(!(__BRYTHON__.path.indexOf($path+'Lib')> -1)){
__BRYTHON__.path.push($path+'Lib')
}
break
}
}
}
}
if(options.py_id===undefined){
for(var $i=0;$i<$elts.length;$i++){
var $elt=$elts[$i]
if($elt.type=="text/python"||$elt.type==="text/python3"){
var $src=null
if($elt.src){
if(window.XMLHttpRequest){
var $xmlhttp=new XMLHttpRequest()
}else{
var $xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
}
$xmlhttp.onreadystatechange=function(){
var state=this.readyState
if(state===4){
$src=$xmlhttp.responseText
}
}
$xmlhttp.open('GET',$elt.src,false)
$xmlhttp.send()
__BRYTHON__.$py_module_path['__main__']=$elt.src
var $src_elts=$elt.src.split('/')
$src_elts.pop()
var $src_path=$src_elts.join('/')
if(__BRYTHON__.path.indexOf($src_path)==-1){
__BRYTHON__.path.splice(0,0,$src_path)
}
}else{
var $src=($elt.innerText || $elt.textContent)
__BRYTHON__.$py_module_path['__main__']=$href
}
try{
var $root=__BRYTHON__.py2js($src,'__main__')
var $js=$root.to_js()
if(__BRYTHON__.debug>1){console.log($js)}
eval($js)
var _mod=$globals
_mod.__class__=__BRYTHON__.$ModuleDict
_mod.__name__='__main__'
_mod.__file__=__BRYTHON__.$py_module_path['__main__']
__BRYTHON__.imported['__main__']=_mod
}catch($err){
console.log('PY2JS '+$err)
for(var attr in $err){
console.log(attr+' : '+$err[attr])
}
console.log('line info '+__BRYTHON__.line_info)
if($err.py_error===undefined){$err=__BRYTHON__.builtins.RuntimeError($err+'')}
var $trace=$err.__name__+': '+$err.message
$trace +='\n'+$err.info
getattr(__BRYTHON__.stderr,'write')($trace)
throw $err
}
}
}
}else{
var $src=($elts.innerText || $elts.textContent)
__BRYTHON__.$py_module_path['__main__']=$href
try{
var $root=__BRYTHON__.py2js($src,'__main__')
var $js=$root.to_js()
if(__BRYTHON__.debug>1){console.log($js)}
eval($js)
var _mod=$globals
_mod.__class__=__BRYTHON__.$ModuleDict
_mod.__name__='__main__'
_mod.__file__=__BRYTHON__.$py_module_path['__main__']
__BRYTHON__.imported['__main__']=_mod
}catch($err){
console.log('PY2JS '+$err)
for(var attr in $err){
console.log(attr+' : '+$err[attr])
}
console.log('line info '+__BRYTHON__.line_info)
if($err.py_error===undefined){$err=__BRYTHON__.builtins.RuntimeError($err+'')}
var $trace=$err.__name__+': '+$err.message
$trace +='\n'+$err.info
getattr(__BRYTHON__.stderr,'write')($trace)
throw $err
}
}
}
__BRYTHON__.$operators=$operators
__BRYTHON__.$Node=$Node
__BRYTHON__.$NodeJSCtx=$NodeJSCtx
__BRYTHON__.brython=brython 
})()
var brython=__BRYTHON__.brython

__BRYTHON__.$__new__=function(factory){
return function(cls){
if(cls===undefined){
throw __BRYTHON__.builtins.TypeError(factory.$dict.__name__+'.__new__(): not enough arguments')
}
var res=factory.apply(null,[])
res.__class__=cls.$dict
var init_func=null
try{init_func=__BRYTHON__.builtins.getattr(res,'__init__')}
catch(err){__BRYTHON__.$pop_exc()}
if(init_func!==null){
var args=[]
for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
init_func.apply(null,args)
res.__initialized__=true
}
return res
}
}
__BRYTHON__.builtins.object=(function($B){
var $ObjectDict={
__name__:'object',
$native:true
}
var $ObjectNI=function(name,op){
return function(other){
throw $B.builtins.TypeError('unorderable types: object() '+op+' '+$B.builtins.str(other.__class__.__name__)+'()')
}
}
$ObjectDict.__delattr__=function(self,attr){delete self[attr]}
$ObjectDict.__dir__=function(self){
var res=[]
var objects=[self]
var mro=self.__class__.__mro__
for(var i=0;i<mro.length;i++){
objects.push(mro[i])
}
for(var i=0;i<objects.length;i++){
for(var attr in objects[i]){
if(attr.charAt(0)!=='$'){
res.push(attr)
}
}
}
res=$B.builtins.list($B.builtins.set(res))
res.sort()
return res
}
$ObjectDict.__eq__=function(self,other){
return self===other
}
$ObjectDict.__ge__=$ObjectNI('__ge__','>=')
$ObjectDict.__getattribute__=function(obj,attr){
var klass=$B.get_class(obj)
if(attr==='__class__'){
return klass.$factory
}
var res=obj[attr],args=[]
if(res===undefined){
var mro=klass.__mro__
for(var i=0;i<mro.length;i++){
var v=mro[i][attr]
if(v!==undefined){
res=v
break
}
}
}else{
if(res.__set__===undefined){
return res
}
}
if(res!==undefined){
var get_func=res.__get__
if(get_func===undefined &&(typeof res=='function')){
get_func=function(x){return x}
}
if(get_func!==undefined){
res.__name__=attr
if(attr=='__new__'){res.$type='staticmethod'}
var res1=get_func.apply(null,[res,obj,klass])
if(typeof res1=='function'){
if(res1.__class__===$B.$factory){return res}
var __self__,__func__,__repr__,__str__
if(res.$type===undefined || res.$type=='function'){
args=[obj]
__self__=obj
__func__=res1
__repr__=__str__=function(){
var x='<bound method '+attr
x +=" of '"+klass.__name__+"' object>"
return x
}
}else if(res.$type==='instancemethod'){
return res
}else if(res.$type==='classmethod'){
args=[klass]
__self__=klass
__func__=res1
__repr__=__str__=function(){
var x='<bound method type'+'.'+attr
x +=' of '+klass.__name__+'>'
return x
}
}else if(res.$type==='staticmethod'){
args=[]
__repr__=__str__=function(){
return '<function '+klass.__name__+'.'+attr+'>'
}
}
var method=(function(initial_args){
return function(){
var local_args=initial_args.slice()
for(var i=0;i<arguments.length;i++){
local_args.push(arguments[i])
}
var x=res.apply(obj,local_args)
if(x===undefined){return $B.builtins.None}else{return x}
}})(args)
method.__class__=__BRYTHON__.$InstanceMethodDict
method.__func__=__func__
method.__repr__=__repr__
method.__self__=__self__
method.__str__=__str__
method.__doc__=res.__doc__ || ''
method.$type='instancemethod'
return method
}else{
return res1
}
}
return res
}else{
var _ga=obj['__getattr__']
if(_ga===undefined){
var mro=klass.__mro__
if(mro===undefined){console.log('in getattr mro undefined for '+obj)}
for(var i=0;i<mro.length;i++){
var v=mro[i]['__getattr__']
if(v!==undefined){
_ga=v
break
}
}
}
if(_ga!==undefined){
try{return _ga(obj,attr)}
catch(err){void(0)}
}
}
}
$ObjectDict.__gt__=$ObjectNI('__gt__','>')
$ObjectDict.__hash__=function(self){
$B.$py_next_hash+=1;
return $B.$py_next_hash
}
$ObjectDict.__le__=$ObjectNI('__le__','<=')
$ObjectDict.__lt__=$ObjectNI('__lt__','<')
$ObjectDict.__mro__=[$ObjectDict]
$ObjectDict.__new__=function(cls){
if(cls===undefined){throw $B.builtins.TypeError('object.__new__(): not enough arguments')}
var obj=new Object()
obj.__class__=cls.$dict
return obj
}
$ObjectDict.__ne__=function(self,other){return self!==other}
$ObjectDict.__or__=function(self,other){
if($B.builtins.bool(self)){return self}else{return other}
}
$ObjectDict.__repr__=function(self){
if(self===object){return "<class 'object'>"}
else if(self===undefined){return "<class 'object'>"}
else if(self.__class__===$B.$type){return "<class '"+self.__class__.__name__+"'>"}
else{return "<"+self.__class__.__name__+" object>"}
}
$ObjectDict.__setattr__=function(self,attr,val){
if(val===undefined){
throw $B.builtins.TypeError("can't set attributes of built-in/extension type 'object'")
}else if(self.__class__===$ObjectDict){
if($ObjectDict[attr]===undefined){
throw $B.builtins.AttributeError("'object' object has no attribute '"+attr+"'")
}else{
throw $B.builtins.AttributeError("'object' object attribute '"+attr+"' is read-only")
}
}
self[attr]=val
}
$ObjectDict.__setattr__.__str__=function(){return 'method object.setattr'}
$ObjectDict.__str__=$ObjectDict.__repr__
$ObjectDict.toString=$ObjectDict.__repr__ 
function object(){
return{__class__:$ObjectDict}
}
object.$dict=$ObjectDict
$ObjectDict.$factory=object
return object
})(__BRYTHON__)
;(function($B){
$B.$class_constructor=function(class_name,class_obj,parents,parents_names,kwargs){
var cl_dict=$B.builtins.dict(),bases=null
for(var attr in class_obj){
$B.builtins.dict.$dict.__setitem__(cl_dict,attr,class_obj[attr])
}
if(parents!==undefined){
for(var i=0;i<parents.length;i++){
if(parents[i]===undefined){
$B.line_info=class_obj.$def_line
throw NameError("name '"+parents_names[i]+"' is not defined")
}
}
}
bases=parents
if(bases.indexOf($B.builtins.object)==-1){
bases=bases.concat($B.builtins.tuple([$B.builtins.object]))
}
var metaclass=$B.builtins.type
for(var i=0;i<kwargs.length;i++){
var key=kwargs[i][0],val=kwargs[i][1]
if(key=='metaclass'){metaclass=val}
}
if(metaclass===$B.builtins.type){
for(var i=0;i<parents.length;i++){
if(parents[i].$dict.__class__!==$B.$type){
metaclass=parents[i].__class__.$factory
break
}
}
}
if(metaclass===$B.builtins.type){return $B.builtins.type(class_name,bases,cl_dict)}
else{
var factory=(function(_class){
return function(){
return $instance_creator(_class).apply(null,arguments)
}
})($B.class_dict)
var new_func=$B.builtins.getattr(metaclass,'__new__')
var factory=$B.builtins.getattr(metaclass,'__new__').apply(null,[factory,class_name,bases,cl_dict])
$B.builtins.getattr(metaclass,'__init__').apply(null,[factory,class_name,bases,cl_dict])
for(var member in metaclass.$dict){
if(typeof metaclass.$dict[member]=='function' && member !='__new__'){
metaclass.$dict[member].$type='classmethod'
}
}
factory.__class__={
__class__:$B.$type,
$factory:metaclass,
is_class:true,
__mro__:metaclass.$dict.__mro__
}
factory.$dict.__class__=metaclass.$dict
return factory
}
}
$B.builtins.type=function(name,bases,cl_dict){
if(arguments.length==1){return $B.get_class(name).$factory}
var class_dict=$B.class_dict=new Object()
class_dict.__class__=$B.$type
class_dict.__name__=name
class_dict.__bases__=bases
class_dict.__dict__=cl_dict
for(var i=0;i<cl_dict.$keys.length;i++){
var attr=cl_dict.$keys[i],val=cl_dict.$values[i]
class_dict[attr]=val
}
var seqs=[]
for(var i=0;i<bases.length;i++){
if(bases[i]===$B.builtins.str){bases[i]=$StringSubclassFactory}
var bmro=[]
for(var k=0;k<bases[i].$dict.__mro__.length;k++){
bmro.push(bases[i].$dict.__mro__[k])
}
seqs.push(bmro)
}
for(var i=0;i<bases.length;i++){
seqs.push(bases[i].$dict)
}
var mro=[]
while(true){
var non_empty=[]
for(var i=0;i<seqs.length;i++){
if(seqs[i].length>0){non_empty.push(seqs[i])}
}
if(non_empty.length==0){break}
for(var i=0;i<non_empty.length;i++){
var seq=non_empty[i],candidate=seq[0],not_head=[]
for(var j=0;j<non_empty.length;j++){
var s=non_empty[j]
if(s.slice(1).indexOf(candidate)>-1){not_head.push(s)}
}
if(not_head.length>0){candidate=null}
else{break}
}
if(candidate===null){
throw $B.builtins.TypeError("inconsistent hierarchy, no C3 MRO is possible")
}
mro.push(candidate)
for(var i=0;i<seqs.length;i++){
var seq=seqs[i]
if(seq[0]===candidate){
seqs[i].shift()
}
}
}
class_dict.__mro__=[class_dict].concat(mro)
var factory=(function(_class){
return function(){
return $instance_creator(_class).apply(null,arguments)
}
})(class_dict)
factory.__class__=$B.$factory
factory.$dict=class_dict
factory.__eq__=function(other){
return other===factory.__class__
}
class_dict.$factory=factory
return factory
}
$B.$type={
$factory:$B.builtins.type,
__init__ : function(self,name,bases,dct){},
__name__:'type',
__new__ : function(self,name,bases,dct){
return $B.builtins.type(name,bases,dct)
},
__str__ : function(){return "<class 'type'>"}
}
$B.$type.__class__=$B.$type
$B.$type.__mro__=[$B.$type,$B.builtins.object.$dict]
$B.builtins.type.$dict=$B.$type
$B.$factory={
__class__:$B.$type,
$factory:$B.builtins.type,
is_class:true
}
$B.$factory.__mro__=[$B.$factory,$B.$type]
$B.builtins.object.$dict.__class__=$B.$type
$B.builtins.object.__class__=$B.$factory
$B.$type.__getattribute__=function(klass,attr){
if(attr==='__call__'){return $instance_creator(klass)}
else if(attr==='__eq__'){return function(other){return klass.$factory===other}}
else if(attr==='__repr__'){return function(){return "<class '"+klass.__name__+"'>"}}
else if(attr==='__str__'){return function(){return "<class '"+klass.__name__+"'>"}}
else if(attr==='__class__'){return klass.__class__.$factory}
else if(attr==='__doc__'){return klass.__doc__}
else if(attr==='__setattr__'){
if(klass['__setattr__']!==undefined){return klass['__setattr__']}
return function(key,value){
if(typeof value=='function'){
klass[key]=function(){return value.apply(null,arguments)}
}else{
klass[key]=value
}
}
}else if(attr==='__delattr__'){
if(klass['__delattr__']!==undefined){return klass['__delattr__']}
return function(key){delete klass[key]}
}
var res=klass[attr],is_class=true
if(res===undefined){
var mro=klass.__mro__
if(mro===undefined){console.log('mro undefined for class '+klass+' name '+klass.__name__)}
for(var i=0;i<mro.length;i++){
var v=mro[i][attr]
if(v!==undefined){
res=v
break
}
}
if(res===undefined){
var cl_mro=klass.__class__.__mro__
if(cl_mro!==undefined){
for(var i=0;i<cl_mro.length;i++){
var v=cl_mro[i][attr]
if(v!==undefined){
res=v
break
}
}
}
}
}
if(res!==undefined){
var get_func=res.__get__
if(get_func===undefined &&(typeof res=='function')){
get_func=function(x){return x}
}
if(get_func!==undefined){
if(attr=='__new__'){res.$type='staticmethod'}
var res1=get_func.apply(null,[res,$B.builtins.None,klass])
var args
if(typeof res1=='function'){
res.__name__=attr
var __self__,__func__,__repr__,__str__
if(res.$type===undefined || res.$type==='function' || res.$type==='instancemethod'){
args=[]
__repr__=__str__=function(){
return '<unbound method '+klass.__name__+'.'+attr+'>'
}
}else if(res.$type==='classmethod'){
args=[klass.$factory]
__self__=klass
__func__=res1
__repr__=__str__=function(){
var x='<bound method '+klass.__name__+'.'+attr
x +=' of '+klass.__name__+'>'
return x
}
}else if(res.$type==='staticmethod'){
args=[]
__repr__=__str__=function(){
return '<function '+klass.__name__+'.'+attr+'>'
}
}
var method=(function(initial_args){
return function(){
var local_args=initial_args.slice()
for(var i=0;i < arguments.length;i++){
local_args.push(arguments[i])
}
return res.apply(null,local_args)
}})(args)
method.__class__={
__class__:$B.$type,
__name__:'method',
__mro__:[$B.builtins.object.$dict]
}
method.__func__=__func__
method.__repr__=__repr__
method.__self__=__self__
method.__str__=__str__
method.__doc__=res.__doc__ || ''
method.im_class=klass
return method
}
}else{
return res
}
}else{
}
}
function $instance_creator(klass){
var getattr=$B.builtins.getattr
return function(){
var new_func=null,init_func=null,obj
try{
new_func=getattr(klass,'__new__')
}catch(err){$B.$pop_exc()}
if(new_func!==null){
var args=[klass.$factory]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
obj=new_func.apply(null,args)
}
if(!obj.__initialized__){
try{init_func=getattr(klass,'__init__')}
catch(err){$B.$pop_exc()}
if(init_func!==null){
var args=[obj]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
init_func.apply(null,args)
}
}
return obj
}
}
function $MethodFactory(){}
$MethodFactory.__name__='method'
$MethodFactory.__class__=$B.$factory
$MethodFactory.__repr__=$MethodFactory.__str__=function(){return 'method'}
$B.$MethodDict={__class__:$B.$type,
__name__:'method',
__mro__:[$B.builtins.object.$dict],
$factory:$MethodFactory
}
$MethodFactory.$dict=$B.$MethodDict
$B.$InstanceMethodDict={__class__:$B.$type,
__name__:'instancemethod',
__mro__:[$B.builtins.object.$dict],
$factory:$MethodFactory
}
})(__BRYTHON__)
;(function($B){
$B.$MakeArgs=function($fname,$args,$required,$defaults,$other_args,$other_kw,$after_star){
var i=null,$set_vars=[],$ns={},$arg
if($other_args !=null){$ns[$other_args]=[]}
if($other_kw !=null){var $dict_keys=[];var $dict_values=[]}
var upargs=[]
for(var i=0;i<$args.length;i++){
$arg=$args[i]
if($arg===undefined){console.log('arg '+i+' undef in '+$fname)}
if($arg===null){upargs.push(null)}
else if($arg.__class__===$B.$ptupleDict){
for(var j=0;j<$arg.arg.length;j++){
upargs.push($arg.arg[j])
}
}else if($arg.__class__===$B.$pdictDict){
for(var j=0;j<$arg.arg.$keys.length;j++){
upargs.push($B.$Kw($arg.arg.$keys[j],$arg.arg.$values[j]))
}
}else{
upargs.push($arg)
}
}
for(var $i=0;$i<upargs.length;$i++){
var $arg=upargs[$i]
var $PyVar=$B.$JS2Py($arg)
if($arg && $arg.__class__===$B.$KwDict){
$PyVar=$arg.value
if($set_vars.indexOf($arg.name)>-1){
console.log($arg.name+' already set to '+$ns[$arg.name])
throw $B.builtins.TypeError($fname+"() got multiple values for argument '"+$arg.name+"'")
}else if($required.indexOf($arg.name)>-1){
var ix=$required.indexOf($arg.name)
eval('var '+$required[ix]+"=$PyVar")
$ns[$required[ix]]=$PyVar
$set_vars.push($required[ix])
}else if($other_args!==null && $after_star!==undefined &&
$after_star.indexOf($arg.name)>-1){
var ix=$after_star.indexOf($arg.name)
eval('var '+$after_star[ix]+"=$PyVar")
$ns[$after_star[ix]]=$PyVar
$set_vars.push($after_star[ix])
}else if($defaults.indexOf($arg.name)>-1){
$ns[$arg.name]=$PyVar
$set_vars.push($arg.name)
}else if($other_kw!=null){
$dict_keys.push($arg.name)
$dict_values.push($PyVar)
}else{
throw $B.builtins.TypeError($fname+"() got an unexpected keyword argument '"+$arg.name+"'")
}
var pos_def=$defaults.indexOf($arg.name)
if(pos_def!=-1){$defaults.splice(pos_def,1)}
}else{
if($i<$required.length){
eval('var '+$required[$i]+"=$PyVar")
$ns[$required[$i]]=$PyVar
$set_vars.push($required[$i])
}else if($other_args!==null){
eval('$ns["'+$other_args+'"].push($PyVar)')
}else if($i<$required.length+$defaults.length){
var $var_name=$defaults[$i-$required.length]
$ns[$var_name]=$PyVar
$set_vars.push($var_name)
}else{
console.log(''+$B.line_info)
msg=$fname+"() takes "+$required.length+' positional argument'
msg +=$required.length==1 ? '' : 's'
msg +=' but more were given'
throw $B.builtins.TypeError(msg)
}
}
}
var missing=[]
for(var i=0;i<$required.length;i++){
if($set_vars.indexOf($required[i])==-1){missing.push($required[i])}
}
if(missing.length==1){
throw $B.builtins.TypeError($fname+" missing 1 positional argument: '"+missing[0]+"'")
}else if(missing.length>1){
var msg=$fname+" missing "+missing.length+" positional arguments: "
for(var i=0;i<missing.length-1;i++){msg +="'"+missing[i]+"', "}
msg +="and '"+missing.pop()+"'"
throw $B.builtins.TypeError(msg)
}
if($other_kw!=null){
$ns[$other_kw]=__BRYTHON__.builtins.dict()
$ns[$other_kw].$keys=$dict_keys
$ns[$other_kw].$values=$dict_values
}
if($other_args!=null){$ns[$other_args]=__BRYTHON__.builtins.tuple($ns[$other_args])}
return $ns
}
$B.get_class=function(obj){
var klass=obj.__class__
if(klass===undefined){
if(typeof obj=='function'){return $B.$FunctionDict}
else if(typeof obj=='number'){return $B.builtins.int.$dict}
else if(typeof obj=='string'){return $B.builtins.str.$dict}
else if(obj===true||obj===false){return $B.$BoolDict}
else if(typeof obj=='object' && obj.constructor===Array){return $B.builtins.list.$dict}
}
return klass
}
$B.$mkdict=function(glob,loc){
var res={}
for(var arg in glob){res[arg]=glob[arg]}
for(var arg in loc){res[arg]=loc[arg]}
return res
}
$B.$list_comp=function(){
var $env=arguments[0]
for(var $arg in $env){
eval("var "+$arg+'=$env["'+$arg+'"]')
}
var $ix=Math.random().toString(36).substr(2,8)
var $py='def func'+$ix+"():\n"
$py +="    res=[]\n"
var indent=4
for(var $i=2;$i<arguments.length;$i++){
for(var $j=0;$j<indent;$j++){$py +=' '}
$py +=arguments[$i]+':\n'
indent +=4
}
for(var $j=0;$j<indent;$j++){$py +=' '}
$py +='res.append('+arguments[1]+')\n'
$py +="    return res\n"
$py +="res"+$ix+"=func"+$ix+"()"
var $mod_name='lc'+$ix
var $root=$B.py2js($py,$mod_name,$B.line_info)
$root.caller=$B.line_info
var $js=$root.to_js()
$B.scope[$mod_name].__dict__=$env
try{
eval($js)
}catch(err){throw $B.exception(err)}
return eval("res"+$ix)
}
$B.$gen_expr=function(){
var $env=arguments[0]
for(var $arg in $env){
try{
if($arg.search(/\./)>-1){
eval($arg+'=$env["'+$arg+'"]')
}else{
eval("var "+$arg+'=$env["'+$arg+'"]')
}
}catch(err){
throw err
}
}
var $ix=Math.random().toString(36).substr(2,8)
var $res='res'+$ix
var $py=$res+"=[]\n"
var indent=0
for(var $i=2;$i<arguments.length;$i++){
for(var $j=0;$j<indent;$j++){$py +=' '}
$py +=arguments[$i]+':\n'
indent +=4
}
for(var $j=0;$j<indent;$j++){$py +=' '}
$py +=$res+'.append('+arguments[1]+')'
var $mod_name='ge'+$ix
var $root=$B.py2js($py,$mod_name,$B.line_info)
$root.caller=$B.line_info
var $js=$root.to_js()
$B.scope[$mod_name].__dict__=$env
eval($js)
var $res1=eval($res)
var $GenExprDict={
__class__:__BRYTHON__.$type,
__name__:'generator',
toString:function(){return '(generator)'}
}
$GenExprDict.__mro__=[$GenExprDict,__BRYTHON__.builtins.object.$dict]
$GenExprDict.__iter__=function(self){return __BRYTHON__.builtins.list.$dict.__iter__(self.value)}
$GenExprDict.__str__=function(self){
if(self===undefined){return "<class 'generator'>"}
return '<generator object <genexpr>>'
}
$GenExprDict.$factory=$GenExprDict
var $res2={value:$res1,__class__:$GenExprDict}
$res2.toString=function(){return 'ge object'}
return $res2
}
$B.$dict_comp=function(){
var $env=arguments[0]
for(var $arg in $env){
eval("var "+$arg+'=$env["'+$arg+'"]')
}
var $ix=Math.random().toString(36).substr(2,8)
var $res='res'+$ix
var $py=$res+"={}\n"
var indent=0
for(var $i=2;$i<arguments.length;$i++){
for(var $j=0;$j<indent;$j++){$py +=' '}
$py +=arguments[$i]+':\n'
indent +=4
}
for(var $j=0;$j<indent;$j++){$py +=' '}
$py +=$res+'.update({'+arguments[1]+'})'
var $mod_name='dc'+$ix
var $root=$B.py2js($py,$mod_name,$B.line_info)
$root.caller=$B.line_info
var $js=$root.to_js()
$B.scope[$mod_name].__dict__=$env
eval($js)
return eval($res)
}
$B.$generator=function(func){
var $GeneratorDict={__class__:__BRYTHON__.$type,
__name__:'generator'
}
$GeneratorDict.__iter__=function(self){return self}
$GeneratorDict.__next__=function(self){
self.$iter++
if(self.$iter<self.func.$iter.length){
if(self.output[self.$iter]!==undefined){
for(var i=0;i<self.output[self.$iter].length;i++){
$B.stdout.write(self.output[self.$iter][i])
}
}
return self.func.$iter[self.$iter]
}
else{throw $B.builtins.StopIteration("")}
}
$GeneratorDict.__mro__=[$GeneratorDict,__BRYTHON__.builtins.object.$dict]
var res=function(){
func.$iter=[]
var save_stdout=$B.stdout
var output={}
$B.stdout=$B.JSObject({
write : function(data){
var loop_num=func.$iter.length
if(output[loop_num]===undefined){
output[loop_num]=[data]
}else{
output[loop_num].push(data)
}
}
})
func.apply(this,arguments)
$B.stdout=save_stdout
var obj={
__class__ : $GeneratorDict,
func:func,
output:output,
$iter:-1
}
return obj
}
res.__repr__=function(){return "<function "+func.__name__+">"}
return res
}
$B.$generator.__repr__=function(){return "<class 'generator'>"}
$B.$generator.__str__=function(){return "<class 'generator'>"}
$B.$generator.__class__=__BRYTHON__.$type
$B.$ternary=function(env,cond,expr1,expr2){
for(var $py_builtin in __BRYTHON__.builtins){eval("var "+$py_builtin+"=__BRYTHON__.builtins[$py_builtin]")}
for(var attr in env){eval('var '+attr+'=env["'+attr+'"]')}
var res='if (bool('+cond+')){\n'
res +='    var $res = '+unescape(expr1)+'\n}else{\n'
res +='    var $res = '+unescape(expr2)+'\n}'
eval(res)
return $res
}
$B.$lambda=function($mod,$globals,$locals,$args,$body){
for(var $attr in $globals){eval('var '+$attr+'=$globals["'+$attr+'"]')}
for(var $attr in $locals){eval('var '+$attr+'=$locals["'+$attr+'"]')}
var $res='lambda_'+Math.random().toString(36).substr(2,8)
var $py='def '+$res+'('+$args+'):\n'
$py +='    return '+$body
var $js=$B.py2js($py,'lambda').to_js()
eval($js)
var $res=eval($res)
$res.__module__=$mod
$res.__name__='<lambda>'
return $res
}
$B.$JS2Py=function(src){
if(src===null||src===undefined){return __BRYTHON__.builtins.None}
if(typeof src==='number'){
if(src%1===0){return src}
else{return $B.builtins.float(src)}
}
var klass=$B.get_class(src)
if(klass!==undefined){
if(klass===__BRYTHON__.builtins.list.$dict){
for(var i=0;i<src.length;i++){
src[i]=$B.$JS2Py(src[i])
}
}
return src
}
if(typeof src=="object"){
if($B.$isNode(src)){return $B.$DOMNode(src)}
else if($B.$isEvent(src)){return $B.$DOMEvent(src)}
else if(src.constructor===Array||$B.$isNodeList(src)){
var res=[]
for(var i=0;i<src.length;i++){
res.push($B.$JS2Py(src[i]))
}
return res
}
}
return $B.JSObject(src)
}
$B.$raise=function(){
if($B.exception_stack.length>0){throw $last($B.exception_stack)}
else{throw Error('Exception')}
}
$B.$syntax_err_line=function(module,pos){
var pos2line={}
var lnum=1
var src=document.$py_src[module]
var line_pos={1:0}
for(var i=0;i<src.length;i++){
pos2line[i]=lnum
if(src.charAt(i)=='\n'){lnum+=1;line_pos[lnum]=i}
}
var line_num=pos2line[pos]
var lines=src.split('\n')
var lib_module=module
if(lib_module.substr(0,13)==='__main__,exec'){lib_module='__main__'}
var line=lines[line_num-1]
var lpos=pos-line_pos[line_num]
while(line && line.charAt(0)==' '){
line=line.substr(1)
lpos--
}
info='\n    ' 
for(var i=0;i<lpos;i++){info+=' '}
info +='^'
return info
}
$B.$SyntaxError=function(module,msg,pos){
var exc=$B.builtins.SyntaxError(msg)
exc.info +=$B.$syntax_err_line(module,pos)
throw exc
}
$B.$IndentationError=function(module,msg,pos){
var exc=$B.builtins.IndentationError(msg)
exc.info +=$B.$syntax_err_line(module,pos)
throw exc
}
$B.$pop_exc=function(){$B.exception_stack.pop()}
$B.$KwDict={__class__:__BRYTHON__.$type,__name__:'kw'}
$B.$KwDict.__mro__=[$B.$KwDict,__BRYTHON__.builtins.object.$dict]
$B.$Kw=function(name,value){
return{__class__:$B.$KwDict,name:name,value:value}
}
$B.$Kw.$dict=$B.$KwDict 
$B.$KwDict.$factory=$B.$Kw
$B.$ptupleDict={
__class__:__BRYTHON__.$type,
__name__:'packed tuple',
toString:function(){return 'ptuple'}
}
$B.$ptupleDict.$dict=$B.$ptupleDict
$B.$ptuple=function(arg){
return{
__class__:$B.$ptupleDict,
arg:arg
}
}
$B.$ptuple.$dict=$B.$ptupleDict
$B.$ptupleDict.$factory=$B.$ptuple
$B.$pdictDict={
__class__ : __BRYTHON__.$type,
__name__:'packed dict'
}
$B.$pdictDict.$dict=$B.$pdictDict
$B.$pdict=function(arg){
return{
__class__:$B.$pdictDict,
arg:arg
}
}
$B.$pdict.$dict=$B.$pdictDict
$B.$pdict.$factory=$B.$pdict
$B.$test_item=function(expr){
$B.$test_result=expr
return __BRYTHON__.builtins.bool(expr)
}
$B.$test_expr=function(){
return $B.$test_result
}
$B.$is_member=function(item,_set){
var f,_iter
var getattr=$B.builtins.getattr
try{f=getattr(_set,"__contains__")}
catch(err){$B.$pop_exc()}
if(f){return f(item)}
try{_iter=$B.builtins.iter(_set)}
catch(err){$B.$pop_exc()}
if(_iter){
while(true){
try{
var elt=$B.builtins.next(_iter)
if(getattr(elt,"__eq__")(item)){return true}
}catch(err){
if(err.__name__=="StopIteration"){
$B.$pop_exc()
return false
}
throw err
}
}
}
try{f=getattr(_set,"__getitem__")}
catch(err){
$B.$pop_exc()
throw TypeError("argument of type '"+_set.__class__.__name__+"' is not iterable")
}
if(f){
var i=-1
while(true){
i++
try{
var elt=f(i)
if(getattr(elt,"__eq__")(item)){return true}
}catch(err){
if(err.__name__=='IndexError'){return false}
else{throw err}
}
}
}
}
var $io={__class__:$B.$type,__name__:'io'}
$io.__mro__=[$io,$B.builtins.object.$dict]
$B.stderr={
__class__:$io,
write:function(data){console.log(data)},
flush:function(){}
}
$B.stderr_buff='' 
$B.stdout={
__class__:$io,
write: function(data){console.log(data)},
flush:function(){}
}
function pyobject2jsobject(obj){
if($B.builtins.isinstance(obj,$B.builtins.dict)){
var temp=new Object()
temp.__class__='dict'
for(var i=0;i<obj.$keys.length;i++){temp[obj.$keys[i]]=obj.$values[i]}
return temp
}
return obj
}
function jsobject2pyobject(obj){
if(obj===undefined)return $B.builtins.None
if(obj.__class__==='dict'){
var d=$B.builtins.dict()
for(var attr in obj){
if(attr !=='__class__')d.__setitem__(attr, obj[attr])
}
return d
}
return obj
}
if(window.IDBObjectStore !==undefined){
window.IDBObjectStore.prototype._put=window.IDBObjectStore.prototype.put
window.IDBObjectStore.prototype.put=function(obj, key){
var myobj=pyobject2jsobject(obj)
return window.IDBObjectStore.prototype._put.apply(this,[myobj, key])
}
window.IDBObjectStore.prototype._add=window.IDBObjectStore.prototype.add
window.IDBObjectStore.prototype.add=function(obj, key){
var myobj=pyobject2jsobject(obj)
return window.IDBObjectStore.prototype._add.apply(this,[myobj, key])
}
}
if(window.IDBRequest !==undefined){
window.IDBRequest.prototype.pyresult=function(){
return jsobject2pyobject(this.result)
}
}
$B.$iterator=function(items,klass){
var res={
__class__:klass,
__iter__:function(){return res},
__len__:function(){return items.length},
__next__:function(){
res.counter++
if(res.counter<items.length){return items[res.counter]}
else{throw $B.builtins.StopIteration("StopIteration")}
},
__repr__:function(){return "<"+klass.__name__+" object>"},
counter:-1
}
res.__str__=res.toString=res.__repr__
return res
}
$B.$iterator_class=function(name){
var res={
__class__:__BRYTHON__.$type,
__name__:name
}
res.__str__=res.toString=res.__repr__
res.__mro__=[res,__BRYTHON__.builtins.object.$dict]
res.$factory={__class__:__BRYTHON__.$factory,$dict:res}
return res
}
$B.$CodeDict={__class__:__BRYTHON__.$type,__name__:'code'}
$B.$CodeDict.__mro__=[$B.$CodeDict,__BRYTHON__.builtins.object.$dict]
})(__BRYTHON__)
if(!Array.indexOf){
Array.prototype.indexOf=function(obj){
for(var i=0;i<this.length;i++){
if(this[i]==obj){
return i;
}
}
return -1;
}
}
try{console}
catch(err){
var console={'log':function(data){void(0)}}
}

;(function($B){
$B.builtins.__debug__=false
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=__builtins__.object.$dict
$B.$comps={'>':'gt','>=':'ge','<':'lt','<=':'le'}
function abs(obj){
if(isinstance(obj,__builtins__.int)){return __builtins__.int(Math.abs(obj))}
else if(isinstance(obj,__builtins__.float)){return __builtins__.float(Math.abs(obj.value))}
else if(hasattr(obj,'__abs__')){return getattr(obj,'__abs__')()}
else{throw __builtins__.TypeError("Bad operand type for abs(): '"+$B.get_class(obj)+"'")}
}
function _alert(src){alert(__builtins__.str(src))}
function all(obj){
var iterable=iter(obj)
while(true){
try{
var elt=next(iterable)
if(!bool(elt)){return False}
}catch(err){return True}
}
}
function any(obj){
var iterable=iter(obj)
while(true){
try{
var elt=next(iterable)
if(bool(elt)){return True}
}catch(err){return False}
}
}
function ascii(obj){
function padWithLeadingZeros(string,pad){
return new Array(pad+1-string.length).join("0")+ string
}
function charEscape(charCode){
if(charCode>255){return "\\u" + padWithLeadingZeros(charCode.toString(16),4)}
else{return "\\x" + padWithLeadingZeros(charCode.toString(16),2)}
}
return obj.split("").map(function(char){
var charCode=char.charCodeAt(0)
return charCode > 127 ? charEscape(charCode): char
})
.join("")
}
function assert_raises(){
var $ns=$B.$MakeArgs('assert_raises',arguments,['exc','func'],[],'args','kw')
var args=$ns['args']
try{$ns['func'].apply(this,args)}
catch(err){
if(err.name!==$ns['exc']){
throw AssertionError(
"exception raised '"+err.name+"', expected '"+$ns['exc']+"'")
}
return
}
throw AssertionError("no exception raised, expected '"+$ns['exc']+"'")
}
function $builtin_base_convert_helper(obj, base){
var value
if(isinstance(obj, __builtins__.int)){
value=obj
}else if(obj.__index__ !==undefined){
value=obj.__index__()
}
if(value===undefined){
throw __builtins__.TypeError('Error, argument must be an integer or contains an __index__ function')
return
}
var prefix=""
if(base==8){prefix="0o" }
else if(base==16){prefix='0x' }
else if(base==2){prefix='0b' }
else{
prefix=''
}
if(value >=0){
return prefix + value.toString(base)
}else{
return '-' + prefix +(-value).toString(base)
}
}
function bin(obj){
return $builtin_base_convert_helper(obj, 2)
}
function bool(obj){
if(obj===null){return False}
else if(obj===undefined){return False}
else if(typeof obj==="boolean"){return obj}
else if(typeof obj==="number" || typeof obj==="string"){
if(obj){return true}else{return false}
}else{
try{return getattr(obj,'__bool__')()}
catch(err){
$B.$pop_exc()
try{return getattr(obj,'__len__')()>0}
catch(err){$B.$pop_exc();return true}
}
}
}
bool.__class__=$B.$type
bool.__mro__=[bool,object]
bool.__name__='bool'
bool.__str__=function(){return "<class 'bool'>"}
bool.toString=bool.__str__
bool.__hash__=function(){
if(this.valueOf())return 1
return 0
}
var $BytearrayDict={__class__:$B.$type,__name__:'bytearray'}
var $bytearray_iterator=$B.$iterator_class('bytearray_iterator')
$BytearrayDict.__iter__=function(self){
return $B.$iterator(self.source,$bytearray_iterator)
}
$BytearrayDict.__mro__=[$BytearrayDict,$ObjectDict]
function bytearray(source, encoding, errors){
return{__class__:$BytearrayDict,source:source}
}
bytearray.__class__=$B.$factory
bytearray.$dict=$BytearrayDict
$BytearrayDict.$factory=bytearray
var $BytesDict={
__class__ : $B.$type,
__name__ : 'bytes'
}
var $bytes_iterator=$B.$iterator_class('bytes_iterator')
$BytesDict.__iter__=function(self){
return $B.$iterator(self.source,$bytes_iterator)
}
$BytesDict.__len__=function(self){return self.source.length}
$BytesDict.__mro__=[$BytesDict,$ObjectDict]
$BytesDict.__repr__=$BytesDict.__str__=function(self){return self.source}
$BytesDict.decode=function(self){return repr(self)}
function bytes(source, encoding, errors){
return{
__class__:$BytesDict,
source:source,
encoding:encoding,
errors:errors
}
}
bytes.__class__=$B.$factory
bytes.$dict=$BytesDict
$BytesDict.$factory=bytes
function callable(obj){
return hasattr(obj,'__call__')
}
function chr(i){
if(i < 0 || i > 1114111){Exception('ValueError', 'Outside valid range')}
return String.fromCharCode(i)
}
var $ClassmethodDict={__class__:$B.$type,__name__:'classmethod'}
$ClassmethodDict.__mro__=[$ClassmethodDict,$ObjectDict]
function classmethod(klass,func){
func.$type='classmethod'
return func
}
classmethod.__class__=$B.$factory
classmethod.$dict=$ClassmethodDict
$ClassmethodDict.$factory=classmethod
function $class(obj,info){
this.obj=obj
this.__name__=info
this.__class__=$B.$type
this.__mro__=[this,$ObjectDict]
}
function compile(source, filename, mode){
return source
return $B.py2js(source, filename).to_js()
}
function delattr(obj, attr){
var klass=$B.get_class(obj)
var res=obj[attr]
if(res===undefined){
var mro=klass.__mro__
for(var i=0;i<mro.length;i++){
var res=mro[i][attr]
if(res!==undefined){break}
}
}
if(res!==undefined && res.__delete__!==undefined){
return res.__delete__(res,obj,attr)
}
getattr(obj,'__delattr__')(attr)
}
function dir(obj){
if(obj===null){
var mod_name=arguments[1]
var res=[],$globals=$B.scope[mod_name].__dict__
for(var attr in $globals){res.push(attr)}
return res
}
if(isinstance(obj,$B.JSObject)){obj=obj.js}
if($B.get_class(obj).is_class){obj=obj.$dict}
else{
try{
var res=getattr(obj, '__dir__')()
res=$B.builtins.list(res)
res.sort()
return res
}catch(err){$B.$pop_exc()}
}
var res=[]
for(var attr in obj){
if(attr.charAt(0)!=='$' && attr!=='__class__'){
res.push(attr)
}
}
res.sort()
return res
}
function divmod(x,y){
var klass=$B.get_class(x)
return[klass.__floordiv__(x,y),
klass.__mod__(x,y)]
}
var $EnumerateDict={__class__:$B.$type,__name__:'enumerate'}
$EnumerateDict.__mro__=[$EnumerateDict,$ObjectDict]
function enumerate(){
var _start=0
var $ns=$B.$MakeArgs("enumerate",arguments,["iterable"],
["start"], null, null)
var _iter=iter($ns["iterable"])
var _start=$ns["start"]|| _start
var res={
__class__:$EnumerateDict,
__getattr__:function(attr){return res[attr]},
__iter__:function(){return res},
__name__:'enumerate iterator',
__next__:function(){
res.counter++
return __builtins__.tuple([res.counter,next(_iter)])
},
__repr__:function(){return "<enumerate object>"},
__str__:function(){return "<enumerate object>"},
counter:_start-1
}
for(var attr in res){
if(typeof res[attr]==='function' && attr!=="__class__"){
res[attr].__str__=(function(x){
return function(){return "<method wrapper '"+x+"' of enumerate object>"}
})(attr)
}
}
return res
}
enumerate.__class__=$B.$factory
enumerate.$dict=$EnumerateDict
$EnumerateDict.$factory=enumerate
var $FilterDict={__class__:$B.$type,__name__:'filter'}
$FilterDict.__iter__=function(self){return self}
$FilterDict.__repr__=$FilterDict.__str__=function(){return "<filter object>"},
$FilterDict.__mro__=[$FilterDict,$ObjectDict]
function filter(){
if(arguments.length!=2){throw __builtins__.TypeError(
"filter expected 2 arguments, got "+arguments.length)}
var func=arguments[0],iterable=iter(arguments[1])
if(func===__builtins__.None){
func=__builtins__.bool
}
var __next__=function(){
while(true){
try{
var _item=next(iterable)
if(func(_item)){return _item}
}catch(err){
if(err.__name__==='StopIteration'){$B.$pop_exc();throw __builtins__.StopIteration('')}
else{throw err}
}
}
}
return{
__class__: $FilterDict,
__next__: __next__
}
}
function getattr(obj,attr,_default){
var klass=$B.get_class(obj)
if(klass===undefined){
if(obj[attr]!==undefined){return obj[attr]}
else if(_default!==undefined){return _default}
else{throw __builtins__.AttributeError('object has no attribute '+attr)}
}
if(attr=='__class__'){
return klass.$factory
}
if(attr==='__dict__'){
var res=__builtins__.dict()
for(var $attr in obj){
if($attr.charAt(0)!='$'){
res.$keys.push($attr)
res.$values.push(obj[$attr])
}
}
return res
}
if(attr==='__call__' &&(typeof obj=='function')){
if($B.debug>0){
return function(){
$B.call_stack.push($B.line_info)
try{
var res=obj.apply(null,arguments)
if(res===undefined){return __builtins__.None}else{return res}
}catch(err){throw err}
finally{$B.call_stack.pop()}
}
}
return function(){
var res=obj.apply(null,arguments)
if(res===undefined){return __builtins__.None}else{return res}
}
}
if(klass.$native){
if(klass[attr]===undefined){
if(_default===undefined){
throw __builtins__.AttributeError(klass.__name__+" object has no attribute '"+attr+"'")
}else{return _default}
}
if(typeof klass[attr]=='function'){
if(attr=='__new__'){
return klass[attr].apply(null,arguments)
}else{
var method=function(){
var args=[obj]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
return klass[attr].apply(null,args)
}
method.__name__='method '+attr+' of built-in '+klass.__name__
return method
}
}
return klass[attr]
}
var is_class=klass.is_class, mro, attr_func
if(is_class){
attr_func=$B.$type.__getattribute__
if(obj.$dict===undefined){console.log('obj '+obj+' $dict undefined')}
obj=obj.$dict
}else{
var mro=klass.__mro__
if(mro===undefined){
console.log('in getattr '+attr+' mro undefined for '+obj+' dir '+dir(obj)+' class '+obj.__class__)
for(var _attr in obj){
console.log('obj attr '+_attr+' : '+obj[_attr])
}
console.log('obj class '+dir(klass)+' str '+klass)
}
for(var i=0;i<mro.length;i++){
attr_func=mro[i]['__getattribute__']
if(attr_func!==undefined){break}
}
}
if(typeof attr_func!=='function'){
console.log(attr+' is not a function '+attr_func)
}
var res=attr_func(obj,attr)
if(res!==undefined){return res}
if(_default !==undefined){return _default}
else{
throw __builtins__.AttributeError("'"+klass.__name__+"' object has no attribute '"+attr+"'")
}
}
getattr.__name__='getattr'
function globals(module){
var res=__builtins__.dict()
var scope=$B.scope[module].__dict__
for(var name in scope){res.$keys.push(name);res.$values.push(scope[name])}
return res
}
function hasattr(obj,attr){
try{getattr(obj,attr);return True}
catch(err){$B.$pop_exc();return False}
}
function hash(obj){
if(isinstance(obj, __builtins__.int)){return obj.valueOf();}
if(isinstance(obj, bool)){return __builtins__.int(obj);}
if(obj.__hashvalue__ !==undefined){return obj.__hashvalue__;}
if(obj.__hash__ !==undefined){
obj.__hashvalue__=obj.__hash__()
return obj.__hashvalue__
}else{
throw __builtins__.AttributeError(
"'"+__builtins__.str(obj.__class__)+"' object has no attribute '__hash__'")
}
}
function help(obj){
if(typeof obj=='string'){
try{var obj=eval(obj)}
catch(err){throw NameError("name '"+obj+"' is not defined")}
}
try{return getattr(obj,'__doc__')}
catch(err){console.log('help err '+err);return ''}
}
function hex(x){
return $builtin_base_convert_helper(x, 16)
}
function id(obj){
if(obj.__hashvalue__ !==undefined){
return obj.__hashvalue__
}
if(obj.__hash__===undefined || isinstance(obj, set)||
isinstance(obj, __builtins__.list)|| isinstance(obj, __builtins__.dict)){
$B.$py_next_hash+=1
obj.__hashvalue__=$B.$py_next_hash
return obj.__hashvalue__
}
if(obj.__hash__ !==undefined){
return obj.__hash__()
}
return null
}
function __import__(mod_name){
$B.$import(mod_name)
return $B.imported[mod_name]
}
function input(src){
return prompt(src)
}
function isinstance(obj,arg){
if(obj===null){return arg===None}
if(obj===undefined){return false}
if(arg.constructor===Array){
for(var i=0;i<arg.length;i++){
if(isinstance(obj,arg[i])){return true}
}
return false
}else{
var klass=$B.get_class(obj)
if(arg===__builtins__.int){
return((typeof obj)=="number"||obj.constructor===Number)&&(obj.valueOf()%1===0)
}
if(arg===__builtins__.float){
return((typeof obj=="number" && obj.valueOf()%1!==0))||
(klass===__builtins__.float.$dict)
}
if(arg===__builtins__.str){return(typeof obj=="string"||klass===__builtins__.str)}
if(arg===__builtins__.list){return(obj.constructor===Array)}
if(klass!==undefined){
if(klass.__mro__===undefined){console.log('mro undef for '+klass+' '+dir(klass)+'\n arg '+arg)}
for(var i=0;i<klass.__mro__.length;i++){
if(klass.__mro__[i]===arg.$dict){return true}
}
return false
}
return obj.constructor===arg
}
}
function issubclass(klass,classinfo){
if(arguments.length!==2){
throw __builtins__.TypeError("issubclass expected 2 arguments, got "+arguments.length)
}
if(!klass.__class__ || !klass.__class__.is_class){
throw __builtins__.TypeError("issubclass() arg 1 must be a class")
}
if(isinstance(classinfo,__builtins__.tuple)){
for(var i=0;i<classinfo.length;i++){
if(issubclass(klass,classinfo[i])){return true}
}
return false
}else if(classinfo.__class__.is_class){
var res=klass.$dict.__mro__.indexOf(classinfo.$dict)>-1 
return res
}else{
throw __builtins__.TypeError("issubclass() arg 2 must be a class or tuple of classes")
}
}
function iter(obj){
try{return getattr(obj,'__iter__')()}
catch(err){
$B.$pop_exc()
throw __builtins__.TypeError("'"+$B.get_class(obj).__name__+"' object is not iterable")
}
}
function len(obj){
try{return getattr(obj,'__len__')()}
catch(err){
throw __builtins__.TypeError("object of type '"+$B.get_class(obj).__name__+"' has no len()")}
}
function locals(obj_id,module){
if($B.scope[obj_id]===undefined){
return globals(module)
}
var res=__builtins__.dict()
var scope=$B.scope[obj_id].__dict__
for(var name in scope){__builtins__.dict.$dict.__setitem__(res,name,scope[name])}
return res
}
var $MapDict={__class__:$B.$type,__name__:'map'}
$MapDict.__mro__=[$MapDict,$ObjectDict]
$MapDict.__iter__=function(self){return self}
function map(){
var func=arguments[0]
var iter_args=[]
for(var i=1;i<arguments.length;i++){iter_args.push(iter(arguments[i]))}
var __next__=function(){
var args=[]
for(var i=0;i<iter_args.length;i++){
try{
var x=next(iter_args[i])
args.push(x)
}catch(err){
if(err.__name__==='StopIteration'){
$B.$pop_exc();throw __builtins__.StopIteration('')
}else{throw err}
}
}
return func.apply(null,args)
}
var obj={
__class__:$MapDict,
__repr__:function(){return "<map object>"},
__str__:function(){return "<map object>"},
__next__: __next__
}
return obj
}
function $extreme(args,op){
if(op==='__gt__'){var $op_name="max"}
else{var $op_name="min"}
if(args.length==0){throw __builtins__.TypeError($op_name+" expected 1 argument, got 0")}
var last_arg=args[args.length-1]
var last_i=args.length-1
var has_key=false
if(isinstance(last_arg,$B.$Kw)){
if(last_arg.name==='key'){
var func=last_arg.value
has_key=true
last_i--
}else{throw __builtins__.TypeError($op_name+"() got an unexpected keyword argument")}
}else{var func=function(x){return x}}
if((has_key && args.length==2)||(!has_key && args.length==1)){
var arg=args[0]
var $iter=iter(arg)
var res=null
while(true){
try{
var x=next($iter)
if(res===null || bool(getattr(func(x),op)(func(res)))){res=x}
}catch(err){
if(err.__name__=="StopIteration"){return res}
throw err
}
}
}else{
var res=null
for(var i=0;i<=last_i;i++){
var x=args[i]
if(res===null || bool(getattr(func(x),op)(func(res)))){res=x}
}
return res
}
}
function max(){
var args=[]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
return $extreme(args,'__gt__')
}
function memoryview(obj){
throw NotImplementedError('memoryview is not implemented')
}
function min(){
var args=[]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
return $extreme(args,'__lt__')
}
function next(obj){
var ga=getattr(obj,'__next__')
if(ga!==undefined){return ga()}
throw __builtins__.TypeError("'"+$B.get_class(obj).__name__+"' object is not an iterator")
}
var $NotImplementedDict={__class__:$B.$type,__name__:'NotImplementedType'}
$NotImplementedDict.__mro__=[$NotImplementedDict,$ObjectDict]
$NotImplementedDict.__repr__=$NotImplementedDict.__str__=function(){return 'NotImplemented'}
var NotImplemented={
__class__ : $NotImplementedDict,
}
function $not(obj){return !bool(obj)}
function oct(x){
return $builtin_base_convert_helper(x, 8)
}
function ord(c){
return c.charCodeAt(0)
}
function pow(){
var $ns=$B.$MakeArgs('pow',arguments,[],[],'args','kw')
var args=$ns['args']
if(args.length<2){throw __builtins__.TypeError(
"pow expected at least 2 arguments, got "+args.length)
}
if(args.length>3){throw __builtins__.TypeError(
"pow expected at most 3 arguments, got "+args.length)
}
if(args.length===2){
var x=args[0]
var y=args[1]
var a,b
if(isinstance(x, __builtins__.float)){
a=x.value
}else if(isinstance(x, __builtins__.int)){
a=x
}else{
throw __builtins__.TypeError("unsupported operand type(s) for ** or pow()")
}
if(isinstance(y, __builtins__.float)){
b=y.value
}else if(isinstance(y, __builtins__.int)){
b=y
}
else{
throw __builtins__.TypeError("unsupported operand type(s) for ** or pow()")
}
return Math.pow(a,b)
}
if(args.length===3){
var x=args[0]
var y=args[1]
var z=args[2]
var a,b,c
if(isinstance(x, __builtins__.int)){a=x}else{throw __builtins__.TypeError(
"pow() 3rd argument not allowed unless all arguments are integers")}
if(isinstance(y, __builtins__.int)){b=y}else{throw __builtins__.TypeError(
"pow() 3rd argument not allowed unless all arguments are integers")}
if(isinstance(z, __builtins__.int)){c=z}else{throw __builtins__.TypeError(
"pow() 3rd argument not allowed unless all arguments are integers")}
return Math.pow(a,b)%c
}
}
function $print(){
var end='\n',sep=' '
var $ns=$B.$MakeArgs('print',arguments,[],['end','sep'],'args', null)
for(var attr in $ns){eval('var '+attr+'=$ns[attr]')}
var res=''
for(var i=0;i<args.length;i++){
res +=__builtins__.str(args[i])
if(i<args.length-1){res +=sep}
}
res +=end
getattr($B.stdout,'write')(res)
}
$print.__name__='print'
function $prompt(text,fill){return prompt(text,fill || '')}
var $PropertyDict={
__class__ : $B.$type,
__name__ : 'property',
__repr__ : function(){return "<property object>"},
__str__ : function(){return "<property object>"},
toString : function(){return "property"}
}
$PropertyDict.__mro__=[$PropertyDict,$ObjectDict]
function property(fget, fset, fdel, doc){
var p={
__class__ : $PropertyDict,
__doc__ : doc || "",
$type:fget.$type,
fget:fget,
fset:fset,
fdel:fdel,
toString:function(){return '<property>'}
}
p.__get__=function(self,obj,objtype){
if(obj===undefined){return self}
if(self.fget===undefined){throw __builtins__.AttributeError("unreadable attribute")}
return getattr(self.fget,'__call__')(obj)
}
if(fset!==undefined){
p.__set__=function(self,obj,value){
if(self.fset===undefined){throw __builtins__.AttributeError("can't set attribute")}
getattr(self.fset,'__call__')(obj,value)
}
}
p.__delete__=fdel
p.getter=function(fget){
return property(fget, p.fset, p.fdel, p.__doc__)
}
p.setter=function(fset){
return property(p.fget, fset, p.fdel, p.__doc__)
}
p.deleter=function(fdel){
return property(p.fget, p.fset, fdel, p.__doc__)
}
return p
}
property.__class__=$B.$factory
property.$dict=$PropertyDict
var $RangeDict={__class__:$B.$type,__name__:'range',$native:true}
$RangeDict.__contains__=function(self,other){
var x=iter(self)
while(true){
try{
var y=$RangeDict.__next__(x)
if(getattr(y,'__eq__')(other)){return true}
}catch(err){return false}
}
return false
}
$RangeDict.__getitem__=function(self,rank){
var res=self.start + rank*self.step
if((self.step>0 && res >=self.stop)||
(self.step<0 && res < self.stop)){
throw __builtins__.IndexError('range object index out of range')
}
return res 
}
$RangeDict.__iter__=function(self){
self.$counter=self.start-self.step
return self
}
$RangeDict.__len__=function(self){
if(self.step>0){return 1+__builtins__.int((self.stop-1-self.start)/self.step)}
else{return 1+__builtins__.int((self.start-1-self.stop)/-self.step)}
}
$RangeDict.__next__=function(self){
self.$counter +=self.step
if((self.step>0 && self.$counter >=self.stop)
||(self.step<0 && self.$counter <=self.stop)){
throw __builtins__.StopIteration('')
}
return self.$counter
}
$RangeDict.__mro__=[$RangeDict,$ObjectDict]
$RangeDict.__reversed__=function(self){
return range(self.stop-1,self.start-1,-self.step)
}
$RangeDict.__repr__=$RangeDict.__str__=function(self){
var res='range('+self.start+', '+self.stop
if(self.step!=1){res +=', '+self.step}
return res+')'
}
function range(){
var $ns=$B.$MakeArgs('range',arguments,[],[],'args',null)
var args=$ns['args']
if(args.length>3){throw __builtins__.TypeError(
"range expected at most 3 arguments, got "+args.length)
}
var start=0
var stop=0
var step=1
if(args.length==1){stop=args[0]}
else if(args.length>=2){
start=args[0]
stop=args[1]
}
if(args.length>=3){step=args[2]}
if(step==0){throw __builtins__.ValueError("range() arg 3 must not be zero")}
var res={
__class__ : $RangeDict,
start:start,
stop:stop,
step:step
}
res.__repr__=res.__str__=function(){
return 'range('+start+','+stop+(args.length>=3 ? ','+step : '')+')'
}
return res
}
range.__class__=$B.$factory
range.$dict=$RangeDict
$RangeDict.$factory=range
function repr(obj){
var func=getattr(obj,'__repr__')
if(func!==undefined){return func()}
else{throw __builtins__.AttributeError("object has no attribute __repr__")}
}
var $ReversedDict={__class__:$B.$type,__name__:'reversed'}
$ReversedDict.__mro__=[$ReversedDict,$ObjectDict]
$ReversedDict.__iter__=function(self){return self}
$ReversedDict.__next__=function(self){
self.$counter--
if(self.$counter<0){throw __builtins__.StopIteration('')}
return self.getter(self.$counter)
}
function reversed(seq){
try{return getattr(seq,'__reversed__')()}
catch(err){
if(err.__name__=='AttributeError'){$B.$pop_exc()}
else{throw err}
}
try{
var res={
__class__:$ReversedDict,
$counter : getattr(seq,'__len__')(),
getter:getattr(seq,'__getitem__')
}
return res
}catch(err){
throw __builtins__.TypeError("argument to reversed() must be a sequence")
}
}
reversed.__class__=$B.$factory
reversed.$dict=$ReversedDict
$ReversedDict.$factory=reversed
function round(arg,n){
if(!isinstance(arg,[__builtins__.int,__builtins__.float])){
throw __builtins__.TypeError("type "+arg.__class__+" doesn't define __round__ method")
}
if(n===undefined){
return __builtins__.int(arg)
}
if(!isinstance(n,__builtins__.int)){throw __builtins__.TypeError(
"'"+n.__class__+"' object cannot be interpreted as an integer")}
var mult=Math.pow(10,n)
var res=__builtins__.int.$dict.__truediv__(Number(Math.round(arg.valueOf()*mult)),mult)
return res
}
function setattr(obj,attr,value){
if(!isinstance(attr,__builtins__.str)){throw __builtins__.TypeError("setattr(): attribute name must be string")}
if($B.forbidden.indexOf(attr)>-1){attr='$$'+attr}
var res=obj[attr]
if(res===undefined){
var mro=$B.get_class(obj).__mro__
for(var i=0;i<mro.length;i++){
var res=mro[i][attr]
if(res!==undefined){break}
}
}
if(res!==undefined && res.__set__!==undefined){
return res.__set__(res,obj,value)
}
try{var f=getattr(obj,'__setattr__')}
catch(err){
$B.$pop_exc()
obj[attr]=value
return
}
f(attr,value)
}
var $SliceDict={__class__:$B.$type,
__name__:'slice'
}
$SliceDict.__mro__=[$SliceDict,$ObjectDict]
function slice(){
var $ns=$B.$MakeArgs('slice',arguments,[],[],'args',null)
var args=$ns['args']
if(args.length>3){throw __builtins__.TypeError(
"slice expected at most 3 arguments, got "+args.length)
}
var start=0
var stop=0
var step=1
if(args.length==1){stop=args[0]}
else if(args.length>=2){
start=args[0]
stop=args[1]
}
if(args.length>=3){step=args[2]}
if(step==0){throw __builtins__.ValueError("slice step must not be zero")}
var res={
__class__ : $SliceDict,
start:start,
stop:stop,
step:step
}
res.__repr__=res.__str__=function(){
return 'slice('+start+','+stop+(args.length>=3 ? ','+step : '')+')'
}
return res
}
slice.__class__=$B.$factory
slice.$dict=$SliceDict
$SliceDict.$factory=slice
function sorted(){
var $ns=$B.$MakeArgs('sorted',arguments,['iterable'],[],null,'kw')
if($ns['iterable']===undefined){throw __builtins__.TypeError("sorted expected 1 positional argument, got 0")}
else{iterable=$ns['iterable']}
var key=__builtins__.dict.$dict.get($ns['kw'],'key',None)
var reverse=__builtins__.dict.$dict.get($ns['kw'],'reverse',false)
var obj=[]
iterable=iter(iterable)
while(true){
try{obj.push(next(iterable))}
catch(err){
if(err.__name__==='StopIteration'){$B.$pop_exc();break}
else{throw err}
}
}
var args=[obj]
if(key !==None){args.push($B.$Kw('key',key))}
if(reverse){args.push($B.$Kw('reverse',true))}
__builtins__.list.$dict.sort.apply(null,args)
return obj
}
var $StaticmethodDict={__class__:$B.$type,__name__:'staticmethod'}
$StaticmethodDict.__mro__=[$StaticmethodDict,$ObjectDict]
function staticmethod(func){
func.$type='staticmethod'
return func
}
staticmethod.__class__=$B.$factory
staticmethod.$dict=$StaticmethodDict
$StaticmethodDict.$factory=staticmethod
function sum(iterable,start){
if(start===undefined){start=0}
var res=start
var iterable=iter(iterable)
while(true){
try{
var _item=next(iterable)
res=getattr(res,'__add__')(_item)
}catch(err){
if(err.__name__==='StopIteration'){$B.$pop_exc();break}
else{throw err}
}
}
return res
}
var $SuperDict={__class__:$B.$type,__name__:'super'}
$SuperDict.__getattribute__=function(self,attr){
var mro=self.__thisclass__.$dict.__mro__,res
for(var i=1;i<mro.length;i++){
res=mro[i][attr]
if(res!==undefined){
if(self.__self_class__!==None){
var _args=[self.__self_class__]
if(attr=='__new__'){_args=[]}
var method=(function(initial_args){
return function(){
var local_args=initial_args.slice()
for(var i=0;i<arguments.length;i++){
local_args.push(arguments[i])
}
var x=res.apply(null,local_args)
if(x===undefined){return None}else{return x}
}})(_args)
method.__class__={
__class__:$B.$type,
__name__:'method',
__mro__:[$ObjectDict]
}
method.__func__=res
method.__self__=self
return method
}
return res
}
}
throw __builtins__.AttributeError("object 'super' has no attribute '"+attr+"'")
}
$SuperDict.__mro__=[$SuperDict,$ObjectDict]
$SuperDict.__repr__=$SuperDict.__str__=function(self){return "<object 'super'>"}
function $$super(_type1,_type2){
return{__class__:$SuperDict,
__thisclass__:_type1,
__self_class__:(_type2 || None)
}
}
$$super.$dict=$SuperDict
$$super.__class__=$B.$factory
$SuperDict.$factory=$$super
function $url_open(){
var mode='r',encoding='utf-8'
var $ns=$B.$MakeArgs('open',arguments,['file'],['mode','encoding'],'args','kw')
for(var attr in $ns){eval('var '+attr+'=$ns["'+attr+'"]')}
if(args.length>0){var mode=args[0]}
if(args.length>1){var encoding=args[1]}
if(isinstance(file,$B.JSObject)){return new $OpenFile(file.js,mode,encoding)}
else if(isinstance(file,__builtins__.str)){
if(window.XMLHttpRequest){
var req=new XMLHttpRequest()
}else{
var req=new ActiveXObject("Microsoft.XMLHTTP")
}
req.onreadystatechange=function(){
var status=req.status
if(status===404){
$res=__builtins__.IOError('File not found')
}else if(status!==200){
$res=__builtins__.IOError('Could not open file '+file+' : status '+status)
}else{
$res=req.responseText
}
}
var fake_qs='?foo='+Math.random().toString(36).substr(2,8)
req.open('GET',file+fake_qs,false)
req.send()
if($res.constructor===Error){throw $res}
var lines=$res.split('\n')
var res=new Object(),counter=0
res.closed=false
res.__enter__=function(){return res}
res.__exit__=function(){return false}
res.__getattr__=function(attr){return res[attr]}
res.__iter__=function(){return iter(lines)}
res.__len__=function(){return lines.length}
res.close=function(){res.closed=true}
res.read=function(nb){
if(res.closed){throw __builtins__.ValueError('I/O operation on closed file')}
if(nb===undefined){return $res}
else{
counter+=nb
return $res.substr(counter-nb,nb)
}
}
res.readable=function(){return true}
res.readline=function(limit){
if(res.closed){throw __builtins__.ValueError('I/O operation on closed file')}
var line=''
if(limit===undefined||limit===-1){limit=null}
while(true){
if(counter>=$res.length-1){break}
else{
var car=$res.charAt(counter)
if(car=='\n'){counter++;return line}
else{
line +=car
if(limit!==null && line.length>=limit){return line}
counter++
}
}
}
}
res.readlines=function(hint){
if(res.closed){throw __builtins__.ValueError('I/O operation on closed file')}
var x=$res.substr(counter).split('\n')
if(hint && hint!==-1){
var y=[],size=0
while(true){
var z=x.shift()
y.push(z)
size +=z.length
if(size>hint || x.length==0){return y}
}
}else{return x}
}
res.seek=function(offset,whence){
if(res.closed){throw __builtins__.ValueError('I/O operation on closed file')}
if(whence===undefined){whence=0}
if(whence===0){counter=offset}
else if(whence===1){counter +=offset}
else if(whence===2){counter=$res.length+offset}
}
res.seekable=function(){return true}
res.tell=function(){return counter}
res.writeable=function(){return false}
return res
}
}
var $ZipDict={__class__:$B.$type,__name__:'zip'}
var $zip_iterator=$B.$iterator_class('zip_iterator')
$ZipDict.__iter__=function(self){
return $B.$iterator(self.items,$zip_iterator)
}
$ZipDict.__mro__=[$ZipDict,$ObjectDict]
function zip(){
var res={__class__:$ZipDict,items:[]}
if(arguments.length==0){return res}
var $ns=$B.$MakeArgs('zip',arguments,[],[],'args','kw')
var _args=$ns['args']
var args=[]
for(var i=0;i<_args.length;i++){args.push(iter(_args[i]))}
var kw=$ns['kw']
var rank=0,items=[]
while(true){
var line=[],flag=true
for(var i=0;i<args.length;i++){
try{
var x=next(args[i])
line.push(x)
}catch(err){
if(err.__name__==='StopIteration'){$B.$pop_exc();flag=false;break}
else{throw err}
}
}
if(!flag){break}
items.push(__builtins__.tuple(line))
rank++
}
res.items=items
return res
}
zip.__class__=$B.$factory
zip.$dict=$ZipDict
$ZipDict.$factory=zip
var $BoolDict=$B.$BoolDict={__class__:$B.$type,
__name__:'bool',
__repr__ : function(){return "<class 'bool'>"},
__str__ : function(){return "<class 'bool'>"},
toString : function(){return "<class 'bool'>"},
$native:true
}
$BoolDict.__mro__=[$BoolDict,$ObjectDict]
bool.__class__=$B.$factory
bool.$dict=$BoolDict
$BoolDict.$factory=bool
$BoolDict.__add__=function(self,other){
if(self.valueOf())return other + 1
return other
}
var True=true
var False=false
$BoolDict.__eq__=function(self,other){
if(self.valueOf()){return !!other}else{return !other}
}
$BoolDict.__ge__=function(self,other){
return __builtins__.int.$dict.__ge__($BoolDict.__hash__(self),other)
}
$BoolDict.__gt__=function(self,other){
return __builtins__.int.$dict.__gt__($BoolDict.__hash__(self),other)
}
$BoolDict.__hash__=function(self){
if(self.valueOf())return 1
return 0
}
$BoolDict.__le__=function(self,other){return !$BoolDict.__gt__(self,other)}
$BoolDict.__lt__=function(self,other){return !$BoolDict.__ge__(self,other)}
$BoolDict.__mul__=function(self,other){
if(self.valueOf())return other
return 0
}
$BoolDict.__repr__=$BoolDict.__str__=function(self){
if(self.valueOf())return "True"
return "False"
}
$BoolDict.__sub__=function(self,other){
if(self.valueOf())return 1-other
return -other
}
var $EllipsisDict={__class__:$B.$type,
__name__:'Ellipsis',
}
$EllipsisDict.__mro__=[$ObjectDict]
$EllipsisDict.$factory=$EllipsisDict
var Ellipsis={
__bool__ : function(){return False},
__class__ : $EllipsisDict,
__repr__ : function(){return 'Ellipsis'},
__str__ : function(){return 'Ellipsis'},
toString : function(){return 'Ellipsis'}
}
var $comp_ops=['ge','gt','le','lt']
for(var $key in $B.$comps){
if($comp_ops.indexOf($B.$comps[$key])>-1){
Ellipsis['__'+$B.$comps[$key]+'__']=(function(k){
return function(other){
throw __builtins__.TypeError("unorderable types: ellipsis() "+k+" "+
other.__class__.__name__)}
})($key)
}
}
for(var $func in Ellipsis){
if(typeof Ellipsis[$func]==='function'){
Ellipsis[$func].__str__=(function(f){
return function(){return "<method-wrapper "+f+" of Ellipsis object>"}
})($func)
}
}
var $NoneDict={__class__:$B.$type,__name__:'NoneType',}
$NoneDict.__mro__=[$NoneDict,$ObjectDict]
$NoneDict.$factory=$NoneDict
var None={
__bool__ : function(){return False},
__class__ : $NoneDict,
__hash__ : function(){return 0},
__repr__ : function(){return 'None'},
__str__ : function(){return 'None'},
toString : function(){return 'None'}
}
var $comp_ops=['ge','gt','le','lt']
for(var $key in $B.$comps){
if($comp_ops.indexOf($B.$comps[$key])>-1){
None['__'+$B.$comps[$key]+'__']=(function(k){
return function(other){
throw __builtins__.TypeError("unorderable types: NoneType() "+k+" "+
$B.get_class(other).__name__)}
})($key)
}
}
for(var $func in None){
if(typeof None[$func]==='function'){
None[$func].__str__=(function(f){
return function(){return "<method-wrapper "+f+" of NoneType object>"}
})($func)
}
}
var $FunctionCodeDict={__class__:$B.$type,__name__:'function code'}
var $FunctionGlobalsDict={__class:$B.$type,__name__:'function globals'}
var $FunctionDict=$B.$FunctionDict={
__class__:$B.$type,
__code__:{__class__:$FunctionCodeDict,__name__:'function code'},
__globals__:{__class__:$FunctionGlobalsDict,__name__:'function globals'},
__name__:'function'
}
$FunctionDict.__repr__=$FunctionDict.__str__=function(self){return '<function type>'}
$FunctionDict.__mro__=[$FunctionDict,$ObjectDict]
var $Function=function(){}
$FunctionDict.$factory=$Function
$Function.$dict=$FunctionDict
__builtins__.$BaseExceptionDict={
__class__:$B.$type,
__name__:'BaseException'
}
__builtins__.$BaseExceptionDict.__init__=function(self){
console.log(self.__class__.__name__+' '+arguments[1])
self.msg=arguments[1]
}
__builtins__.$BaseExceptionDict.__repr__=function(self){
if(self.message===None){return self.__class__.__name__+'()'}
return self.message
}
__builtins__.$BaseExceptionDict.__str__=__builtins__.$BaseExceptionDict.__repr__
__builtins__.$BaseExceptionDict.__mro__=[__builtins__.$BaseExceptionDict,$ObjectDict]
__builtins__.$BaseExceptionDict.__new__=function(cls){
var err=__builtins__.BaseException()
err.__name__=cls.$dict.__name__
err.__class__=cls.$dict
return err
}
var $TracebackDict={__class__:$B.$type,
__name__:'traceback',
__mro__:[$ObjectDict]
}
var $FrameDict={__class__:$B.$type,
__name__:'frame',
__mro__:[$ObjectDict]
}
var BaseException=function(msg,js_exc){
var err=Error()
err.info='Traceback (most recent call last):'
if(msg===undefined){msg='BaseException'}
var tb=None
if($B.debug && !msg.info){
if(js_exc!==undefined){
for(var attr in js_exc){
if(attr==='message'){continue}
try{err.info +='\n    '+attr+' : '+js_exc[attr]}
catch(_err){void(0)}
}
err.info+='\n' 
}
var last_info
for(var i=0;i<$B.call_stack.length;i++){
var call_info=$B.call_stack[i]
var lib_module=call_info[1]
var caller=$B.modules[lib_module].caller
if(caller!==undefined){
call_info=caller
lib_module=caller[1]
}
if(lib_module.substr(0,13)==='__main__,exec'){lib_module='__main__'}
var lines=document.$py_src[call_info[1]].split('\n')
err.info +='\n  module '+lib_module+' line '+call_info[0]
var line=lines[call_info[0]-1]
while(line && line.charAt(0)==' '){line=line.substr(1)}
err.info +='\n    '+line
last_info=call_info
if(i==0){
tb={__class__:$TracebackDict,
tb_frame:{__class__:$FrameDict},
tb_lineno:call_info[0],
tb_lasti:line
}
}
}
var err_info=$B.line_info
while(true){
var mod=$B.modules[err_info[1]]
if(mod===undefined){break}
var caller=mod.caller
if(caller===undefined){break}
err_info=caller
}
if(err_info!==last_info){
var module=err_info[1]
var line_num=err_info[0]
var lines=document.$py_src[module].split('\n')
var lib_module=module
if(lib_module.substr(0,13)==='__main__,exec'){lib_module='__main__'}
err.info +="\n  module "+lib_module+" line "+line_num
var line=lines[line_num-1]
while(line && line.charAt(0)==' '){line=line.substr(1)}
err.info +='\n    '+line
tb={__class__:$TracebackDict,
tb_frame:{__class__:$FrameDict},
tb_lineno:line_num,
tb_lasti:line
}
}
}
err.message=msg
err.args=msg
err.__name__='BaseException'
err.__class__=__builtins__.$BaseExceptionDict
err.py_error=true
err.type='BaseException'
err.value=msg
err.traceback=tb
$B.exception_stack.push(err)
return err
}
BaseException.__name__='BaseException'
BaseException.__class__=$B.$factory
BaseException.$dict=__builtins__.$BaseExceptionDict
__builtins__.BaseException=BaseException
$B.exception=function(js_exc){
if(js_exc.py_error && $B.debug>0){console.log('info '+js_exc.info)}
if(!js_exc.py_error){
if($B.debug>0 && js_exc.info===undefined){
if($B.line_info!==undefined){
var mod_name=$B.line_info[1]
var module=$B.modules[mod_name]
if(module){
if(module.caller!==undefined){
$B.line_info=module.caller
var mod_name=$B.line_info[1]
}
var lib_module=mod_name
if(lib_module.substr(0,13)==='__main__,exec'){lib_module='__main__'}
var line_num=$B.line_info[0]
var lines=document.$py_src[mod_name].split('\n')
js_exc.message +="\n  module '"+lib_module+"' line "+line_num
js_exc.message +='\n'+lines[line_num-1]
js_exc.info_in_msg=true
}
}else{
console.log('error '+js_exc)
}
}
var exc=Error()
exc.__name__=js_exc.__name__ || js_exc.name
exc.__class__=__builtins__.$ExceptionDict
if(js_exc.name=='ReferenceError'){
exc.__name__='NameError'
exc.__class__=__builtins__.$NameErrorDict
}
exc.message=js_exc.message
exc.info=''
}else{
var exc=js_exc
}
$B.exception_stack.push(exc)
return exc
}
$B.is_exc=function(exc,exc_list){
if(exc.__class__===undefined){
exc=$B.exception(exc)
}
var exc_class=exc.__class__.$factory
for(var i=0;i<exc_list.length;i++){
if(issubclass(exc_class,exc_list[i])){return true}
}
return false
}
function $make_exc(names,parent){
for(var i=0;i<names.length;i++){
var name=names[i]
var $exc=(BaseException+'').replace(/BaseException/g,name)
eval('__builtins__.$'+name+'Dict={__class__:$B.$type,__name__:"'+name+'"}')
eval('__builtins__.$'+name+'Dict.__mro__=[__builtins__.$'+name+'Dict].concat(parent.$dict.__mro__)')
eval('__builtins__.'+name+'='+$exc)
eval('__builtins__.'+name+'.__repr__ = function(){return "<class '+"'"+name+"'"+'>"}')
eval('__builtins__.'+name+'.__str__ = function(){return "<class '+"'"+name+"'"+'>"}')
eval('__builtins__.'+name+'.__class__=$B.$factory')
eval('__builtins__.$'+name+'Dict.$factory=__builtins__.'+name)
eval('__builtins__.'+name+'.$dict=__builtins__.$'+name+'Dict')
}
}
$make_exc(['SystemExit','KeyboardInterrupt','GeneratorExit','Exception'],BaseException)
$make_exc(['StopIteration','ArithmeticError','AssertionError','AttributeError',
'BufferError','EOFError','ImportError','LookupError','MemoryError',
'NameError','OSError','ReferenceError','RuntimeError','SyntaxError',
'SystemError','TypeError','ValueError','Warning'],__builtins__.Exception)
$make_exc(['FloatingPointError','OverflowError','ZeroDivisionError'],
__builtins__.ArithmeticError)
$make_exc(['IndexError','KeyError'],__builtins__.LookupError)
$make_exc(['UnboundLocalError'],__builtins__.NameError)
$make_exc(['BlockingIOError','ChildProcessError','ConnectionError',
'FileExistsError','FileNotFoundError','InterruptedError',
'IsADirectoryError','NotADirectoryError','PermissionError',
'ProcessLookupError','TimeoutError'],__builtins__.OSError)
$make_exc(['BrokenPipeError','ConnectionAbortedError','ConnectionRefusedError',
'ConnectionResetError'],__builtins__.ConnectionError)
$make_exc(['NotImplementedError'],__builtins__.RuntimeError)
$make_exc(['IndentationError'],__builtins__.SyntaxError)
$make_exc(['TabError'],__builtins__.IndentationError)
$make_exc(['UnicodeError'],__builtins__.ValueError)
$make_exc(['UnicodeDecodeError','UnicodeEncodeError','UnicodeTranslateError'],
__builtins__.UnicodeError)
$make_exc(['DeprecationWarning','PendingDeprecationWarning','RuntimeWarning',
'SyntaxWarning','UserWarning','FutureWarning','ImportWarning',
'UnicodeWarning','BytesWarning','ResourceWarning'],__builtins__.Warning)
$make_exc(['EnvironmentError','IOError','VMSError','WindowsError'],__builtins__.OSError)
var builtin_names=['Ellipsis', 'False', 'None', 
'True', '_', '__build_class__', '__debug__', '__doc__', '__import__', '__name__', 
'__package__', 'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'bytearray', 'bytes',
'callable', 'chr', 'classmethod', 'compile', 'complex', 'copyright', 'credits',
'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'exit', 
'filter', '__builtins__.float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 
'help', 'hex', 'id', 'input', '__builtins__.int', 'isinstance', 'issubclass', 'iter', 'len', 
'license', 'list', 'locals', 'map', 'max', 'memoryview', 'min', 'next', 'object', 
'oct', 'open', 'ord', 'pow', 'print', 'property', 'quit', 'range', 'repr', 
'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 
'sum','super', 'tuple', 'type', 'vars', 'zip']
for(var i=0;i<builtin_names.length;i++){
var name=builtin_names[i]
try{
eval('__builtins__.'+name+'='+name)
if(typeof __builtins__[name]=='function'){
__builtins__[name].__repr__=__builtins__[name].__str__=(function(x){
return function(){return '<built-in function '+x+'>'}
})(name)
}
}
catch(err){}
}
$B._alert=_alert
__builtins__['$open']=$url_open
__builtins__['$print']=$print
__builtins__['$$super']=$$super
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=__builtins__.object.$dict
function $applyToConstructor(constructor, argArray){
var args=[null].concat(argArray)
var factoryFunction=constructor.bind.apply(constructor, args)
return new factoryFunction()
}
var $LocationDict={__class__:$B.$type,
__name__:'Location'
}
$LocationDict.__mro__=[$LocationDict,$ObjectDict]
function $Location(){
var obj={}
for(var x in window.location){
if(typeof window.location[x]==='function'){
obj[x]=(function(f){
return function(){
return f.apply(window.location,arguments)
}
})(window.location[x])
}else{
obj[x]=window.location[x]
}
}
if(obj['replace']===undefined){
obj['replace']=function(url){window.location=url}
}
obj.__class__=$LocationDict
obj.toString=function(){return window.location.toString()}
obj.__repr__=obj.__str__=obj.toString
return obj
}
$LocationDict.$factory=$Location
$Location.$dict=$LocationDict
var $JSConstructorDict={
__class__:$B.$type,
__name__:'JSConstructor'
}
$JSConstructorDict.__call__=function(self){
var args=[]
for(var i=1;i<arguments.length;i++){
var arg=arguments[i]
if(arg &&(arg.__class__===$JSObjectDict || arg.__class__===$JSConstructorDict)){
args.push(arg.js)
}
else if(isinstance(arg,__builtins__.dict)){
var obj=new Object()
for(var j=0;j<arg.$keys.length;j++){
obj[arg.$keys[j]]=arg.$values[j].js || arg.$values[j]
}
args.push(obj)
}else{args.push(arg)}
}
var res=$applyToConstructor(self.js,args)
return JSObject(res)
}
$JSConstructorDict.__mro__=[$JSConstructorDict,$ObjectDict]
function JSConstructor(obj){
return{
__class__:$JSConstructorDict,
js:obj
}
}
JSConstructor.__class__=$B.$factory
JSConstructor.$dict=$JSConstructorDict
function $JSObject(js){
this.js=js
this.$dict=js
this.__class__=$JSObjectDict
this.__str__=function(){return "<object 'JSObject' wraps "+this.js+">"}
this.toString=this.__str__
}
var $JSObjectDict={
__class__:$B.$type,
__name__:'JSObject',
toString:function(){return '(JSObject)'}
}
$JSObjectDict.__bool__=function(self){
return(new Boolean(self.js)).valueOf()
}
$JSObjectDict.__getattribute__=function(obj,attr){
if(obj.js===null){return $ObjectDict.__getattribute__(None,attr)}
if(attr==='__class__'){return $JSObjectDict}
if(obj['get_'+attr]!==undefined){
var res=obj['get_'+attr]
if(typeof res==='function'){
return(function(obj){
return function(){return obj['get_'+attr].apply(obj,arguments)}
})(obj)
}
return obj['get_'+attr]
}else if(obj.js[attr]!==undefined){
if(typeof obj.js[attr]=='function'){
var res=function(){
var args=[],arg
for(var i=0;i<arguments.length;i++){
arg=arguments[i]
if(arg &&(arg.__class__===$JSObjectDict || arg.__class__===$JSConstructorDict)){
args.push(arg.js)
}else if(arg && arg.__class__===$B.DOMNode){
args.push(arg.elt)
}else if(arg && arg.__class__===$B.builtins.dict.$dict){
var jsobj={}
for(var i=0;i<arg.$keys.length;i++){jsobj[arg.$keys[i]]=arg.$values[i].js || arg.$values[i]}
args.push(jsobj)
}else if(arg && arg.__class__===$B.builtins.float.$dict){
args.push(arg.value)
}else{
args.push(arg)
}
}
var res=obj.js[attr].apply(obj.js,args)
if(typeof res=='object'){return JSObject(res)}
else if(res===undefined){return None}
else{return __BRYTHON__.$JS2Py(res)}
}
res.__repr__=function(){return '<function '+attr+'>'}
res.__str__=function(){return '<function '+attr+'>'}
return res
}else{
return __BRYTHON__.$JS2Py(obj.js[attr])
}
}else if(obj.js===window && attr==='$$location'){
return $Location()
}
var res
var mro=[$JSObjectDict,$ObjectDict]
for(var i=0;i<mro.length;i++){
var v=mro[i][attr]
if(v!==undefined){
res=v
break
}
}
if(res!==undefined){
if(typeof res==='function'){
return function(){
var args=[obj],arg
for(var i=0;i<arguments.length;i++){
arg=arguments[i]
if(arg &&(arg.__class__===$JSObjectDict || arg.__class__===$JSConstructorDict)){
args.push(arg.js)
}else{
args.push(arg)
}
}
return res.apply(obj,args)
}
}
return __BRYTHON__.$JS2Py(res)
}else{
throw __builtins__.AttributeError("no attribute "+attr+' for '+this)
}
}
$JSObjectDict.__getitem__=function(self,rank){
try{return getattr(self.js,'__getitem__')(rank)}
catch(err){
if(self.js[rank]!==undefined){return JSObject(self.js[rank])}
else{throw __builtins__.AttributeError(self+' has no attribute __getitem__')}
}
}
var $JSObject_iterator=$B.$iterator_class('JS object iterator')
$JSObjectDict.__iter__=function(self){
return $B.$iterator(self.js,$JSObject_iterator)
}
$JSObjectDict.__len__=function(self){
try{return getattr(self.js,'__len__')()}
catch(err){
console.log('err in JSObject.__len__ : '+err)
throw __builtins__.AttributeError(this+' has no attribute __len__')
}
}
$JSObjectDict.__mro__=[$JSObjectDict,$ObjectDict]
$JSObjectDict.__repr__=function(self){return self.js.toString()}
$JSObjectDict.__setattr__=function(self,attr,value){
if(isinstance(value,JSObject)){
self.js[attr]=value.js
}else{
self.js[attr]=value
}
}
$JSObjectDict.__setitem__=$JSObjectDict.__setattr__
$JSObjectDict.__str__=$JSObjectDict.__repr__
function JSObject(obj){
if(obj===null){return new $JSObject(obj)}
var klass=$B.get_class(obj)
if(klass===__builtins__.list.$dict){
if(obj.__brython__){return obj}
else{var res=new $JSObject(obj)
return res
}
}
if(klass!==undefined){return obj}
return new $JSObject(obj)
}
JSObject.__class__=$B.$factory
JSObject.$dict=$JSObjectDict
$B.JSObject=JSObject
$B.$JSObject=$JSObject
$B.JSConstructor=JSConstructor
})(__BRYTHON__)

;(function($B){
var __builtins__=$B.builtins
$B.$ModuleDict={
__class__ : $B.$type,
__name__ : 'module',
}
$B.$ModuleDict.__repr__=function(self){return '<module '+self.__name__+'>'}
$B.$ModuleDict.__str__=function(self){return '<module '+self.__name__+'>'}
$B.$ModuleDict.__mro__=[$B.$ModuleDict,$B.builtins.object.$dict]
function $importer(){
var $xmlhttp=new XMLHttpRequest()
var __builtins__=__BRYTHON__.builtins
if(__builtins__.$CORS && "withCredentials" in $xmlhttp){
}else if(__builtins__.$CORS && typeof window.XDomainRequest !="undefined"){
$xmlhttp=new window.XDomainRequest()
}else if(window.XMLHttpRequest){
}else{
$xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
}
var fake_qs
if(__BRYTHON__.$options.cache===undefined ||
__BRYTHON__.$options.cache=='none'){
fake_qs="?v="+Math.random().toString(36).substr(2,8)
}else if(__BRYTHON__.$options.cache=='version'){
fake_qs="?v="+__BRYTHON__.version_info[2]
}else if(__BRYTHON__.$options.cache=='browser'){
fake_qs=""
}else{
fake_qs="?v="+Math.random().toString(36).substr(2,8)
}
var timer=setTimeout(function(){
$xmlhttp.abort()
throw __builtins__.ImportError("No module named '"+module+"'")}, 5000)
return[$xmlhttp,fake_qs,timer]
}
function $download_module(module,url){
var imp=$importer(),__builtins__=__BRYTHON__.builtins
var $xmlhttp=imp[0],fake_qs=imp[1],timer=imp[2],res=null
$xmlhttp.open('GET',url+fake_qs,false)
if(__builtins__.$CORS){
$xmlhttp.onload=function(){
if($xmlhttp.status==200 || $xmlhttp.status==0){
res=$xmlhttp.responseText
}else{
res=__builtins__.FileNotFoundError("No module named '"+module+"'")
}
}
$xmlhttp.onerror=function(){
res=__builtins__.FileNotFoundError("No module named '"+module+"'")
}
}else{
$xmlhttp.onreadystatechange=function(){
if($xmlhttp.readyState==4){
window.clearTimeout(timer)
if($xmlhttp.status==200 || $xmlhttp.status==0){res=$xmlhttp.responseText}
else{
res=__builtins__.FileNotFoundError("No module named '"+module+"'")
}
}
}
}
if('overrideMimeType' in $xmlhttp){$xmlhttp.overrideMimeType("text/plain")}
$xmlhttp.send()
if(res.constructor===Error){throw res}
return res
}
$B.$import_js=function(module){
var name=module.name
if(name.substr(0,2)=='$$'){name=name.substr(2)}
var filepath=__BRYTHON__.brython_path+'libs/' + name
return $B.$import_js_generic(module,filepath)
}
$B.$import_js_generic=function(module,filepath){
var module_contents=$download_module(module.name, filepath+'.js')
return $B.$import_js_module(module, filepath+'.js', module_contents)
}
function show_ns(){
var kk=Object.keys(window)
for(var i=0;i < kk.length;i++){
console.log(kk[i])
if(kk[i].charAt(0)=='$'){console.log(eval(kk[i]))}
}
console.log('---')
}
$B.$import_js_module=function(module,filepath,module_contents){
eval(module_contents)
try{$module}
catch(err){
throw __builtins__.ImportError("name '$module' is not defined in module")
}
__BRYTHON__.scope[module.name]={__dict__:$module}
$module.__class__=$B.$ModuleDict
$module.__name__=module.name
$module.__repr__=function(){return "<module '"+module.name+"' from "+filepath+" >"}
$module.__str__=function(){return "<module '"+module.name+"' from "+filepath+" >"}
$module.__file__=filepath
return $module
}
$B.$import_module_search_path=function(module,origin){
var path_list=__BRYTHON__.path.slice()
return $B.$import_module_search_path_list(module,__BRYTHON__.path,origin)
}
$B.$import_module_search_path_list=function(module,path_list,origin){
var search=[]
if(origin!==undefined){
var origin_path=__BRYTHON__.$py_module_path[origin]
var elts=origin_path.split('/')
elts.pop()
origin_path=elts.join('/')
if(path_list.indexOf(origin_path)==-1){
path_list.splice(0,0,origin_path)
}
}
var mod_path=module.name.replace(/\./g,'/')
if(mod_path.substr(0,2)=='$$'){mod_path=mod_path.substr(2)}
if(!module.package_only){
search.push(mod_path)
}
search.push(mod_path+'/__init__')
var flag=false
for(var j=0;j < search.length;j++){
var modpath=search[j]
for(var i=0;i<path_list.length;i++){
var path=path_list[i]+ "/" + modpath
try{
var mod=$B.$import_py(module,path)
flag=true
if(j==search.length-1){mod.$package=true}
}catch(err){if(err.__name__!=="FileNotFoundError"){flag=true;throw err}}
if(flag){break}
}
if(flag){break}
}
if(!flag){
throw __builtins__.ImportError("module "+module.name+" not found")
}
return mod
}
$B.$import_py=function(module,path){
var module_contents=$download_module(module.name, path+'.py')
return $B.$import_py_module(module,path+'.py',module_contents)
}
$B.$import_py_module=function(module,path,module_contents){
var $Node=__BRYTHON__.$Node,$NodeJSCtx=__BRYTHON__.$NodeJSCtx
__BRYTHON__.$py_module_path[module.name]=path 
var root=__BRYTHON__.py2js(module_contents,module.name)
var body=root.children
root.children=[]
var mod_node=new $Node('expression')
new $NodeJSCtx(mod_node,'var $module=(function()')
root.insert(0,mod_node)
mod_node.children=body
var ret_node=new $Node('expression')
new $NodeJSCtx(ret_node,'return $globals')
mod_node.add(ret_node)
var ex_node=new $Node('expression')
new $NodeJSCtx(ex_node,')(__BRYTHON__)')
root.add(ex_node)
try{
var js=root.to_js()
if(__BRYTHON__.$options.debug==10){
console.log('code for module '+module.name)
console.log(js)
}
eval(js)
}catch(err){
console.log(''+err+' '+' for module '+module.name)
for(var attr in err){
console.log(attr+' '+err[attr])
}
if(__BRYTHON__.debug>0){console.log('line info '+__BRYTHON__.line_info)}
throw err
}
try{
for(var attr in __BRYTHON__.scope[module.name].__dict__){
$module[attr]=__BRYTHON__.scope[module.name].__dict__[attr]
}
$module.__class__=$B.$ModuleDict
$module.__repr__=function(){return "<module '"+module.name+"' from "+path+" >"}
$module.__str__=function(){return "<module '"+module.name+"' from "+path+" >"}
$module.toString=function(){return "module "+module.name}
$module.__file__=path
$module.__initializing__=false
return $module
}catch(err){
console.log(''+err+' '+' for module '+module.name)
for(var attr in err){
console.log(attr+' '+err[attr])
}
if(__BRYTHON__.debug>0){console.log('line info '+__BRYTHON__.line_info)}
throw err
}
}
$B.$import_single=function(module,origin){
var import_funcs=[$B.$import_js, $B.$import_module_search_path]
if(module.name.search(/\./)>-1){import_funcs=[$B.$import_module_search_path]}
for(var j=0;j<import_funcs.length;j++){
try{
return import_funcs[j](module,origin)
}catch(err){
if(err.__name__==="FileNotFoundError"){
if(j==import_funcs.length-1){
__BRYTHON__.imported[module.name]=undefined
__BRYTHON__.modules[module.name]=undefined
throw err
}else{
continue
}
}else{
__BRYTHON__.imported[module.name]=undefined
__BRYTHON__.modules[module.name]=undefined
throw err
}
}
}
}
$B.$import=function(mod_name,origin){
if(__BRYTHON__.$options.debug==10){
console.log('$import '+mod_name);show_ns()
}
var res=[]
var mod
var stored=__BRYTHON__.imported[mod_name]
if(stored===undefined){
mod={}
var parts=mod_name.split('.')
for(var i=0;i<parts.length;i++){
var module=new Object()
module.name=parts.slice(0,i+1).join('.')
if(__BRYTHON__.modules[module.name]===undefined){
__BRYTHON__.modules[module.name]={__class__:$B.$ModuleDict}
__BRYTHON__.imported[module.name]={__class__:$B.$ModuleDict}
if(i<parts.length-1){module.package_only=true}
__BRYTHON__.modules[module.name]=$B.$import_single(module,origin)
__BRYTHON__.imported[module.name]=__BRYTHON__.modules[module.name]
}
}
}else{
mod=stored
}
res.push(mod)
return res
}
$B.$import_from=function(mod_name,names,origin){
if(__BRYTHON__.$options.debug==10){
console.log('import from '+mod_name);show_ns()
}
if(mod_name.substr(0,2)=='$$'){mod_name=mod_name.substr(2)}
var mod=__BRYTHON__.imported[mod_name]
if(mod===undefined){$B.$import(mod_name);mod=__BRYTHON__.modules[mod_name]}
var mod_ns=mod
for(var i=0;i<names.length;i++){
if(mod_ns[names[i]]===undefined){
if(mod.$package){
var sub_mod=mod_name+'.'+names[i]
$B.$import(sub_mod,origin)
mod[names[i]]=__BRYTHON__.modules[sub_mod]
}else{
throw __builtins__.ImportError("cannot import name "+names[i])
}
}
}
return mod
}
$B.$import_list_intra=function(src,current_url,names){
var mod
var elts=current_url.split('/')
var nbpts=0 
while(src.charAt(nbpts)=='.'){nbpts++}
var pymod_elts=elts.slice(0,elts.length-nbpts)
var pymod_name=src.substr(nbpts)
var pymod_path=pymod_elts.join('/')
if(pymod_name){
var stored=__BRYTHON__.imported[pymod_name]
if(stored!==undefined){return stored}
var pymod={'name':pymod_name}
mod=$B.$import_module_search_path_list(pymod,[pymod_path])
if(mod!=undefined){
__BRYTHON__.modules[pymod_name]=mod
__BRYTHON__.imported[pymod_name]=mod
return mod
}
}else{
mod={}
for(var i=0;i<names.length;i++){
var stored=__BRYTHON__.imported[names[i]]
if(stored!==undefined){mod[names[i]]=stored}
else{
mod[names[i]]=$B.$import_module_search_path_list({'name':names[i]},[pymod_path])
__BRYTHON__.modules[names[i]]=mod[names[i]]
__BRYTHON__.imported[names[i]]=mod[names[i]]
}
}
}
return mod
}
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=object.$dict
var $FloatDict={__class__:$B.$type,__name__:'float',$native:true}
$FloatDict.__bool__=function(self){return bool(self.value)}
$FloatDict.__class__=$B.$type
$FloatDict.__eq__=function(self,other){
if(other===undefined){
return self===float
}
if(isinstance(other,__builtins__.int)){return self.value==other}
else if(isinstance(other,float)){return self.value==other.value}
else if(isinstance(other,__builtins__.complex)){
if(other.imag !=0)return False
return self.value==other.value}
else{return self.value===other}
}
$FloatDict.__floordiv__=function(self,other){
if(isinstance(other,__builtins__.int)){
if(other===0){throw ZeroDivisionError('division by zero')}
else{return float(Math.floor(self.value/other))}
}else if(isinstance(other,float)){
if(!other.value){throw ZeroDivisionError('division by zero')}
else{return float(Math.floor(self.value/other.value))}
}else{throw __builtins__.TypeError(
"unsupported operand type(s) for //: 'float' and '"+other.__class__+"'")
}
}
$FloatDict.__getformat__=function(self,arg){
if(['double','float'].indexOf(arg)){return 'IEEE, little-endian'}
throw __builtins__.ValueError("__getformat__() argument 1 must be 'double' or 'float'")
}
$FloatDict.__hash__=function(){
frexp=function(re){
var ex=Math.floor(Math.log(re)/ Math.log(2))+ 1
var frac=re / Math.pow(2, ex)
return[frac, ex]
}
if(this.value===Infinity || this.value===-Infinity){
if(this.value < 0.0)return -271828
return 314159
}else if(isNaN(this.value)){
return 0
}
var r=frexp(this.value)
r[0]*=Math.pow(2,31)
hipart=__builtins__.int(r[0])
r[0]=(r[0]- hipart)* Math.pow(2,31)
var x=hipart + __builtins__.int(r[0])+(r[1]<< 15)
return x & 0xFFFFFFFF
}
$FloatDict.__init__=function(self,value){self.value=value}
$FloatDict.__mod__=function(self,other){
if(isinstance(other,__builtins__.int)){
return float((self.value%other+other)%other)
}
else if(isinstance(other,float)){
return float(((self.value%other.value)+other.value)%other.value)
}else if(isinstance(other,bool)){
var bool_value=0;
if(other.valueOf())bool_value=1
return float((self.value%bool_value+bool_value)%bool_value)
}else{throw __builtins__.TypeError(
"unsupported operand type(s) for -: "+self.value+" (float) and '"+other.__class__+"'")
}
}
$FloatDict.__mro__=[$FloatDict,$ObjectDict]
$FloatDict.__ne__=function(self,other){return !$FloatDict.__eq__(self,other)}
$FloatDict.__neg__=function(self,other){return float(-self.value)}
$FloatDict.__repr__=$FloatDict.__str__=function(self){
if(self===float){return "<class 'float'>"}
var res=self.value+'' 
if(res.indexOf('.')==-1){res+='.0'}
return __builtins__.str(res)
}
$FloatDict.__truediv__=function(self,other){
if(isinstance(other,__builtins__.int)){
if(other===0){throw ZeroDivisionError('division by zero')}
else{return float(self.value/other)}
}else if(isinstance(other,float)){
if(!other.value){throw ZeroDivisionError('division by zero')}
else{return float(self.value/other.value)}
}else{throw __builtins__.TypeError(
"unsupported operand type(s) for //: 'float' and '"+other.__class__+"'")
}
}
var $op_func=function(self,other){
if(isinstance(other,__builtins__.int)){return float(self.value-other)}
else if(isinstance(other,float)){return float(self.value-other.value)}
else if(isinstance(other,bool)){
var bool_value=0;
if(other.valueOf())bool_value=1
return float(self.value-bool_value)}
else if(isinstance(other,__builtins__.complex)){
return complex(self.value - other.real, other.imag)}
else{throw __builtins__.TypeError(
"unsupported operand type(s) for -: "+self.value+" (float) and '"+other.__class__+"'")
}
}
$op_func +='' 
var $ops={'+':'add','-':'sub','*':'mul'}
for(var $op in $ops){
eval('$FloatDict.__'+$ops[$op]+'__ = '+$op_func.replace(/-/gm,$op))
}
$FloatDict.__pow__=function(self,other){
if(isinstance(other,__builtins__.int)){return float(Math.pow(self,other))}
else if(isinstance(other,float)){return float(Math.pow(self.value,other.value))}
else{throw __builtins__.TypeError(
"unsupported operand type(s) for -: "+self.value+" (float) and '"+other.__class__+"'")
}
}
var $comp_func=function(self,other){
if(isinstance(other,__builtins__.int)){return self.value > other.valueOf()}
else if(isinstance(other,float)){return self.value > other.value}
else{throw __builtins__.TypeError(
"unorderable types: "+self.__class__+'() > '+other.__class__+"()")
}
}
$comp_func +='' 
var $comps={'>':'gt','>=':'ge','<':'lt','<=':'le'}
for(var $op in $comps){
eval("$FloatDict.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))
}
var $notimplemented=function(self,other){
throw __builtins__.TypeError(
"unsupported operand types for OPERATOR: '"+self.__class__+"' and '"+other.__class__+"'")
}
$notimplemented +='' 
for(var $op in $B.$operators){
if(['+=','-=','*=','/=','%='].indexOf($op)>-1)continue
var $opfunc='__'+$B.$operators[$op]+'__'
if(!($opfunc in $FloatDict)){
eval('$FloatDict.'+$opfunc+"="+$notimplemented.replace(/OPERATOR/gm,$op))
}
}
function $FloatClass(value){
this.value=value
this.__class__=$FloatDict
this.toString=function(){return this.value}
this.valueOf=function(){return value}
}
var float=function(value){
if(value===undefined){return new $FloatClass(0.0)}
if(typeof value=="number" ||(typeof value=="string" && !isNaN(value))){
var res=new $FloatClass(eval(value))
return res
}
if(isinstance(value,float))return value
if(value=='inf')return new $FloatClass(Infinity)
if(value=='-inf')return new $FloatClass(-Infinity)
if(typeof value=='string' && value.toLowerCase()=='nan')return new $FloatClass(Number.NaN)
throw __builtins__.ValueError("Could not convert to float(): '"+__builtins__.str(value)+"'")
}
float.__class__=$B.$factory
float.$dict=$FloatDict
$FloatDict.$factory=float
$FloatDict.__new__=$B.$__new__(float)
$B.builtins.float=float
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=object.$dict
function $UnsupportedOpType(op,class1,class2){
throw __builtins__.TypeError("unsupported operand type(s) for "+op+": '"+class1+"' and '"+class2+"'")
}
var $IntDict={__class__:$B.$type,
__name__:'int',
toString:function(){return '$IntDict'},
$native:true
}
$IntDict.from_bytes=function(x, byteorder){
var len=x.length
var num=x.charCodeAt(len - 1)
if(type.signed &&(num >=128)){
num=num - 256
}
for(var i=(len - 2);i >=0;i--){
num=256 * num + x.charCodeAt(i)
}
return num
}
$IntDict.__bool__=function(self){return new Boolean(self.valueOf())}
$IntDict.__class__=$B.$type
$IntDict.__eq__=function(self,other){
if(other===undefined){
return self===int
}
if(isinstance(other,int)){return self.valueOf()==other.valueOf()}
else if(isinstance(other,__builtins__.float)){return self.valueOf()==other.value}
else if(isinstance(other,__builtins__.complex)){
if(other.imag !=0)return False
return self.valueOf()==other.real}
else{return self.valueOf()===other}
}
$IntDict.__floordiv__=function(self,other){
if(isinstance(other,int)){
if(other==0){throw ZeroDivisionError('division by zero')}
else{return Math.floor(self/other)}
}else if(isinstance(other,__builtins__.float)){
if(!other.value){throw ZeroDivisionError('division by zero')}
else{return __builtins__.float(Math.floor(self/other.value))}
}else{$UnsupportedOpType("//","int",other.__class__)}
}
$IntDict.__hash__=function(self){return self.valueOf()}
$IntDict.__in__=function(self,item){
return getattr(item,'__contains__')(self)
}
$IntDict.__init__=function(self,value){
self.toString=function(){return value}
self.valueOf=function(){return value}
}
$IntDict.__int__=function(self){return self}
$IntDict.__invert__=function(self){return ~self}
$IntDict.__mod__=function(self,other){
if(isinstance(other,__builtins__.tuple)&& other.length==1){other=other[0]}
if(isinstance(other,int)){
return(self%other+other)%other
}
else if(isinstance(other,__builtins__.float)){
return((self%other)+other)%other
}else if(isinstance(other,bool)){
var bool_value=0;
if(other.valueOf())bool_value=1
return(self%bool_value+bool_value)%bool_value
}else{throw __builtins__.TypeError(
"unsupported operand type(s) for %: "+self+" (int) and '"+other.__class__+"'")
}
}
$IntDict.__mro__=[$IntDict,$ObjectDict]
$IntDict.__mul__=function(self,other){
var val=self.valueOf(),list=__builtins__.list,tuple=__builtins__.tuple
if(isinstance(other,int)){return self*other}
else if(isinstance(other,__builtins__.float)){return __builtins__.float(self*other.value)}
else if(isinstance(other,__builtins__.bool)){
var bool_value=0
if(other.valueOf())bool_value=1
return self*bool_value}
else if(isinstance(other,__builtins__.complex)){
return __builtins__.complex(self.valueOf()* other.real, self.valueOf()* other.imag)}
else if(typeof other==="string"){
var res=''
for(var i=0;i<val;i++){res+=other}
return res
}else if(isinstance(other,[list,tuple])){
var res=[]
var $temp=other.slice(0,other.length)
for(var i=0;i<val;i++){res=res.concat($temp)}
if(isinstance(other,tuple)){res=tuple(res)}
return res
}else{$UnsupportedOpType("*",int,other)}
}
$IntDict.__name__='int'
$IntDict.__ne__=function(self,other){return !$IntDict.__eq__(self,other)}
$IntDict.__neg__=function(self){return -self}
$IntDict.__new__=function(cls){
if(cls===undefined){throw __builtins__.TypeError('int.__new__(): not enough arguments')}
return{__class__:cls.$dict}
}
$IntDict.__not_in__=function(self,item){
res=getattr(item,'__contains__')(self)
return !res
}
$IntDict.__pow__=function(self,other){
if(isinstance(other, int)){
if(other.valueOf()>=0){return int(Math.pow(self.valueOf(),other.valueOf()))}
else{return Math.pow(self.valueOf(),other.valueOf())}}
else if(isinstance(other, __builtins__.float)){return __builtins__.float(Math.pow(self.valueOf(), other.valueOf()))}
else{$UnsupportedOpType("**",int,other.__class__)}
}
$IntDict.__repr__=function(self){
if(self===int){return "<class 'int'>"}
return self.toString()
}
$IntDict.__setattr__=function(self,attr,value){
if(self.__class__===$IntDict){throw __builtins__.AttributeError("'int' object has no attribute "+attr+"'")}
self[attr]=value
}
$IntDict.__str__=$IntDict.__repr__
$IntDict.__truediv__=function(self,other){
if(isinstance(other,int)){
if(other==0){throw ZeroDivisionError('division by zero')}
else{return __builtins__.float(self/other)}
}else if(isinstance(other,__builtins__.float)){
if(!other.value){throw ZeroDivisionError('division by zero')}
else{return __builtins__.float(self/other.value)}
}else{$UnsupportedOpType("//","int",other.__class__)}
}
$IntDict.bit_length=function(self){
s=bin(self)
s=getattr(s,'lstrip')('-0b')
return s.length 
}
var $op_func=function(self,other){
if(isinstance(other,int)){return self-other}
else if(isinstance(other,__builtins__.bool)){return self-other}
$UnsupportedOpType("-","int",other.__class__)
}
$op_func +='' 
var $ops={'&':'and','|':'ior','<<':'lshift','>>':'rshift','^':'xor'}
for(var $op in $ops){
eval('$IntDict.__'+$ops[$op]+'__ = '+$op_func.replace(/-/gm,$op))
}
$IntDict.__or__=$IntDict.__ior__
var $op_func=function(self,other){
if(isinstance(other,int)){
var res=self.valueOf()-other.valueOf()
if(isinstance(res,int)){return res}
else{return __builtins__.float(res)}
}
else if(isinstance(other,__builtins__.float)){return __builtins__.float(self.valueOf()-other.value)}
else if(isinstance(other,bool)){
var bool_value=0
if(other.valueOf())bool_value=1
return self.valueOf()-bool_value}
else if(isinstance(other,__builtins__.complex)){
return __builtins__.complex(self.valueOf()- other.real, other.imag)}
else{throw __builtins__.TypeError(
"unsupported GG operand type(s) for -: "+self.valueOf()+" and '"+__builtins__.str(other.__class__)+"'")
}
}
$op_func +='' 
var $ops={'+':'add','-':'sub'}
for(var $op in $ops){
eval('$IntDict.__'+$ops[$op]+'__ = '+$op_func.replace(/-/gm,$op))
}
var $comp_func=function(self,other){
if(isinstance(other,int)){return self.valueOf()> other.valueOf()}
else if(isinstance(other,__builtins__.float)){return self.valueOf()> other.value}
else if(isinstance(other,bool)){return self.valueOf()> __builtins__.bool.$dict.__hash__(other)}
else{throw __builtins__.TypeError(
"unorderable types: "+self.__class__.__name__+'() > '+other.__class__.__name__+"()")}
}
$comp_func +='' 
for(var $op in $B.$comps){
eval("$IntDict.__"+$B.$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))
}
var int=function(value,base){
var res
if(base===undefined){base=10}
if(value===undefined){res=Number(0)}
else if(isinstance(value,int)){res=Number(value)}
else if(value===True){res=Number(1)}
else if(value===False){res=Number(0)}
else if(typeof value=="number"){res=Number(parseInt(value))}
else if(typeof value=="string"){
try{
res=Number(parseInt(value,base))
}catch(err){
throw __builtins__.ValueError(
"Invalid literal for int() with base "+base +": '"+__builtins__.str(value)+"'")
}
}else if(isinstance(value,__builtins__.float)){
res=Number(parseInt(value.value))
}else{throw __builtins__.ValueError(
"Invalid literal for int() with base "+base +": '"+__builtins__.str(value)+"'")
}
return res
}
int.$dict=$IntDict
int.__class__=$B.$factory
$IntDict.$factory=int
$B.builtins.int=int
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=object.$dict
function $UnsupportedOpType(op,class1,class2){
throw __builtins__.TypeError("unsupported operand type(s) for "+op+": '"+class1+"' and '"+class2+"'")
}
var $ComplexDict={__class__:$B.$type,
__name__:'complex',
toString:function(){return '$ComplexDict'},
$native:true
}
$ComplexDict.__abs__=function(self,other){return complex(abs(self.real),abs(self.imag))}
$ComplexDict.__bool__=function(self){return new Boolean(self.real || self.imag)}
$ComplexDict.__class__=$B.$type
$ComplexDict.__eq__=function(self,other){
if(isinstance(other,complex)){return self.real==other.real && self.imag==other.imag}
else if(isinstance(other,__builtins__.int)){
if(self.imag !=0)return False
return self.real==other.valueOf()}
else if(isinstance(other,__builtins__.float)){
if(self.imag !=0)return False
return self.real==other.value}
else{$UnsupportedOpType("==","complex",other.__class__)}
}
$ComplexDict.__floordiv__=function(self,other){
$UnsupportedOpType("//","complex",other.__class__)
}
$ComplexDict.__hash__=function(self){return hash(self)}
$ComplexDict.__init__=function(self,real,imag){
self.toString=function(){return '('+real+'+'+imag+'j)'}
}
$ComplexDict.__invert__=function(self){return ~self}
$ComplexDict.__mod__=function(self,other){
throw __builtins__.TypeError("TypeError: can't mod complex numbers.")
}
$ComplexDict.__mro__=[$ComplexDict,$ObjectDict]
$ComplexDict.__mul__=function(self,other){
if(isinstance(other,complex)){
return complex(self.real*other.real-self.imag*other.imag, self.imag*other.real + self.real*other.imag)}
else if(isinstance(other,__builtins__.int)){
return complex(self.real*other.valueOf(), self.imag*other.valueOf())}
else if(isinstance(other,__builtins__.float)){
return complex(self.real*other.value, self.imag*other.value)}
else if(isinstance(other,bool)){
if(other.valueOf())return self
return complex(0)}
else{$UnsupportedOpType("*",complex,other)}
}
$ComplexDict.__name__='complex'
$ComplexDict.__ne__=function(self,other){return !$ComplexDict.__eq__(self,other)}
$ComplexDict.__neg__=function(self){return complex(-self.real,-self.imag)}
$ComplexDict.__new__=function(cls){
if(cls===undefined){throw __builtins__.TypeError('complex.__new__(): not enough arguments')}
return{__class__:cls.$dict}
}
$ComplexDict.__pow__=function(self,other){
$UnsupportedOpType("**",complex,other.__class__)
}
$ComplexDict.__str__=$ComplexDict.__repr__=function(self){
if(self.real==0){return self.imag+'j'}
return '('+self.real+'+'+self.imag+'j)'
}
$ComplexDict.__sqrt__=function(self){
if(self.imag==0){return complex(Math.sqrt(self.real))}
var _a=Math.sqrt((self.real + Math.sqrt(self.real*self.real + self.imag*self.imag))/2)
var _b=Number.sign(self.imag)* Math.sqrt((-self.real + Math.sqrt(self.real*self.real + self.imag*self.imag))/2)
return complex(_a, _b)
}
$ComplexDict.__truediv__=function(self,other){
if(isinstance(other,complex)){
if(other.real==0 && other.imag==0){
throw ZeroDivisionError('division by zero')
}
var _num=self.real*other.real + self.imag*other.imag
var _div=other.real*other.real + other.imag*other.imag
var _num2=self.imag*other.real - self.real*other.imag
return complex(_num/_div, _num2/_div)
}else if(isinstance(other,__builtins__.int)){
if(!other.valueOf()){throw ZeroDivisionError('division by zero')}
return $ComplexDict.__truediv__(self, complex(other.valueOf()))
}else if(isinstance(other,__builtins__.float)){
if(!other.value){throw ZeroDivisionError('division by zero')}
return $ComplexDict.__truediv__(self, complex(other.value))
}else{$UnsupportedOpType("//","complex",other.__class__)}
}
var $op_func=function(self,other){
throw __builtins__.TypeError("TypeError: unsupported operand type(s) for -: 'complex' and '" + other.__class__+"'")
}
$op_func +='' 
var $ops={'&':'and','|':'ior','<<':'lshift','>>':'rshift','^':'xor'}
for(var $op in $ops){
eval('$ComplexDict.__'+$ops[$op]+'__ = '+$op_func.replace(/-/gm,$op))
}
$ComplexDict.__ior__=$ComplexDict.__or__
var $op_func=function(self,other){
if(isinstance(other,complex)){
return complex(self.real - other.real, self.imag-other.imag)
}else if(isinstance(other,__builtins__.int)){
return complex(self.real - other.valueOf(), self.imag)
}else if(isinstance(other,__builtins__.float)){
return complex(self.real - other.value, self.imag)
}else if(isinstance(other,bool)){
var bool_value=0
if(other.valueOf())bool_value=1
return complex(self.real - bool_value, self.imag)
}else{throw __builtins__.TypeError(
"unsupported GG operand type(s) for -: "+self.__repr__()+" and '"+__builtins__.str(other.__class__)+"'")
}
}
$op_func +='' 
var $ops={'+':'add','-':'sub'}
for(var $op in $ops){
eval('$ComplexDict.__'+$ops[$op]+'__ = '+$op_func.replace(/-/gm,$op))
}
var $comp_func=function(self,other){
throw __builtins__.TypeError("TypeError: unorderable types: complex() > " + other.__class__ + "()")
}
$comp_func +='' 
for(var $op in $B.$comps){
eval("$ComplexDict.__"+$B.$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))
}
var complex=function(real,imag){
var res={
__class__:$ComplexDict,
real:real || 0,
imag:imag || 0
}
res.__repr__=res.__str__=function(){
if(real==0){return imag + 'j'}
return '('+real+'+'+imag+'j)'
}
return res
}
complex.$dict=$ComplexDict
complex.__class__=$B.$factory
$ComplexDict.$factory=complex
$B.builtins.complex=complex
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=object.$dict
function $DictClass($keys,$values){
this.iter=null
this.__class__=$DictDict
this.$keys=$keys 
this.$values=$values 
}
var $DictDict={__class__:$B.$type,
__name__ : 'dict',
$native:true
}
$DictDict.__add__=function(self,other){
var msg="unsupported operand types for +:'dict' and "
throw __builtins__.TypeError(msg+"'"+(__builtins__.str(other.__class__)|| typeof other)+"'")
}
$DictDict.__bool__=function(self){return self.$keys.length>0}
$DictDict.__contains__=function(self,item){
if(self.$jsobj){return self.$jsobj[item]!==undefined}
return __builtins__.list.$dict.__contains__(self.$keys,item)
}
$DictDict.__delitem__=function(self,arg){
for(var i=0;i<self.$keys.length;i++){
if(getattr(arg,'__eq__')(self.$keys[i])){
self.$keys.splice(i,1)
self.$values.splice(i,1)
if(self.$jsobj){delete self.$jsobj[arg]}
return
}
}
throw KeyError(__builtins__.str(arg))
}
$DictDict.__eq__=function(self,other){
if(other===undefined){
return self===dict
}
if(!isinstance(other,dict)){console.log('other is not dict');return False}
if(other.$keys.length!==self.$keys.length){return False}
for(var i=0;i<self.$keys.length;i++){
var key=self.$keys[i]
for(var j=0;j<other.$keys.length;j++){
try{
if(getattr(other.$keys[j],'__eq__')(key)){
if(!getattr(other.$values[j],'__eq__')(self.$values[i])){
return False
}
}
}catch(err){__BRYTHON__.$pop_exc()}
}
}
return True
}
$DictDict.__getitem__=function(self,arg){
for(var i=0;i<self.$keys.length;i++){
if(getattr(arg,'__eq__')(self.$keys[i])){return self.$values[i]}
}
throw KeyError(__builtins__.str(arg))
}
$DictDict.__hash__=function(self){throw __builtins__.TypeError("unhashable type: 'dict'");}
$DictDict.__init__=function(self){
var args=[]
for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
self.$keys=[]
self.$values=[]
if(args.length==0){return}
else if(args.length===1){
var obj=args[0]
if(isinstance(obj,dict)){
self.$keys=obj.$keys
self.$values=obj.$values
return
}
else if(obj.__class__===__BRYTHON__.JSObject.$dict){
var res=new $DictClass([],[])
for(var attr in obj.js){
$DictDict.__setitem__(res,attr,obj.js[attr])
}
self.$keys=res.$keys
self.$values=res.$values
self.$jsobj=obj.js 
return
}
}
var $ns=__BRYTHON__.$MakeArgs('dict',args,[],[],'args','kw')
var args=$ns['args']
var kw=$ns['kw']
if(args.length>0){
if(isinstance(args[0],dict)){
self.$keys=args[0].$keys
self.$values=args[0].$values
}else{
var iterable=iter(args[0])
while(true){
try{
var elt=next(iterable)
self.$keys.push(getattr(elt,'__getitem__')(0))
self.$values.push(getattr(elt,'__getitem__')(1))
}catch(err){
if(err.__name__==='StopIteration'){__BRYTHON__.$pop_exc();break}
else{throw err}
}
}
}
return
}else if(kw.$keys.length>0){
self.$keys=kw.$keys
self.$values=kw.$values
}
}
var $dict_iterator=$B.$iterator_class('dict iterator')
$DictDict.__iter__=function(self){
return $B.$iterator(self.$keys,$dict_iterator)
}
$DictDict.__len__=function(self){return self.$keys.length}
$DictDict.__mro__=[$DictDict,$ObjectDict]
$DictDict.__ne__=function(self,other){return !$DictDict.__eq__(self,other)}
$DictDict.__next__=function(self){
if(self.iter==null){self.iter==0}
if(self.iter<self.$keys.length){
self.iter++
return self.$keys[self.iter-1]
}else{
self.iter=null
throw __builtins__.StopIteration()
}
}
$DictDict.__repr__=function(self){
if(self===undefined){return "<class 'dict'>"}
var res="{",key=null,value=null,i=null 
var qesc=new RegExp('"',"g")
for(var i=0;i<self.$keys.length;i++){
res +=repr(self.$keys[i])+':'+repr(self.$values[i])
if(i<self.$keys.length-1){res +=','}
}
return res+'}'
}
$DictDict.__setitem__=function(self,key,value){
for(var i=0;i<self.$keys.length;i++){
try{
if(getattr(key,'__eq__')(self.$keys[i])){
self.$values[i]=value
return
}
}catch(err){
__BRYTHON__.$pop_exc()
}
}
self.$keys.push(key)
self.$values.push(value)
if(self.$jsobj){self.$jsobj[key]=value}
}
$DictDict.__str__=$DictDict.__repr__
$DictDict.clear=function(self){
self.$keys=[]
self.$values=[]
if(self.$jsobj){self.$jsobj={}}
}
$DictDict.copy=function(self){
var res=dict()
for(var i=0;i<self.$keys.length;i++){
res.$keys.push(self.$keys[i])
res.$values.push(self.$values[i])
}
return res
}
$DictDict.get=function(self,key,_default){
try{return $DictDict.__getitem__(self,key)}
catch(err){
__BRYTHON__.$pop_exc()
if(_default!==undefined){return _default}
else{return None}
}
}
var $dict_itemsDict=$B.$iterator_class('dict_itemiterator')
$DictDict.items=function(self){
var items=[]
for(var i=0;i<self.$keys.length;i++){
items.push(__builtins__.tuple([self.$keys[i],self.$values[i]]))
}
return $B.$iterator(items,$dict_itemsDict)
}
var $dict_keysDict=$B.$iterator_class('dict_keys')
$DictDict.keys=function(self){
return $B.$iterator(self.$keys,$dict_keysDict)
}
$DictDict.pop=function(self,key,_default){
try{
var res=$DictDict.__getitem__(self,key)
$DictDict.__delitem__(self,key)
return res
}catch(err){
__BRYTHON__.$pop_exc()
if(err.__name__==='KeyError'){
if(_default!==undefined){return _default}
throw err
}else{throw err}
}
}
$DictDict.popitem=function(self){
if(self.$keys.length===0){throw KeyError("'popitem(): dictionary is empty'")}
return __builtins__.tuple([self.$keys.pop(),self.$values.pop()])
}
$DictDict.setdefault=function(self,key,_default){
try{return $DictDict.__getitem__(self,key)}
catch(err){
if(_default===undefined){_default=None}
$DictDict.__setitem__(self,key,_default)
return _default
}
}
$DictDict.update=function(self){
var params=[]
for(var i=1;i<arguments.length;i++){params.push(arguments[i])}
var $ns=__BRYTHON__.$MakeArgs('$DictDict.update',params,[],[],'args','kw')
var args=$ns['args']
if(args.length>0 && isinstance(args[0],dict)){
var other=args[0]
for(var i=0;i<other.$keys.length;i++){
$DictDict.__setitem__(self,other.$keys[i],other.$values[i])
}
}
var kw=$ns['kw']
var keys=kw.$keys
for(var i=0;i<keys.length;i++){
$DictDict.__setitem__(self,keys[i],kw.$values(keys[i]))
}
}
var $dict_valuesDict=$B.$iterator_class('dict_values')
$DictDict.values=function(self){
return $B.$iterator(self.$values,$dict_valuesDict)
}
function dict(){
var res={__class__:$DictDict}
var args=[res]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
$DictDict.__init__.apply(null,args)
return res
}
$B.$dict=dict 
dict.__class__=$B.$factory
dict.$dict=$DictDict
$DictDict.$factory=dict
$DictDict.__new__=$B.$__new__(dict)
$B.builtins.dict=dict
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=object.$dict
function $list(){
var args=new Array()
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
return new $ListDict(args)
}
var $ListDict={__class__:$B.$type,__name__:'list',$native:true}
$ListDict.__add__=function(self,other){
var res=self.valueOf().concat(other.valueOf())
if(isinstance(self,tuple)){res=tuple(res)}
return res
}
$ListDict.__contains__=function(self,item){
for(var i=0;i<self.length;i++){
try{if(getattr(self[i],'__eq__')(item)){return true}
}catch(err){__BRYTHON__.$pop_exc();void(0)}
}
return false
}
$ListDict.__delitem__=function(self,arg){
if(isinstance(arg,__builtins__.int)){
var pos=arg
if(arg<0){pos=self.length+pos}
if(pos>=0 && pos<self.length){
self.splice(pos,1)
return
}
else{throw __builtins__.IndexError('list index out of range')}
}else if(isinstance(arg,slice)){
var start=arg.start;if(start===None){start=0}
var stop=arg.stop;if(stop===None){stop=self.length}
var step=arg.step || 1
if(start<0){start=self.length+start}
if(stop<0){stop=self.length+stop}
var res=[],i=null
if(step>0){
if(stop>start){
for(var i=start;i<stop;i+=step){
if(self[i]!==undefined){res.push(i)}
}
}
}else{
if(stop<start){
for(var i=start;i>stop;i+=step.value){
if(self[i]!==undefined){res.push(i)}
}
res.reverse()
}
}
for(var i=res.length-1;i>=0;i--){
self.splice(res[i],1)
}
return
}else{
throw __builtins__.TypeError('list indices must be integer, not '+__builtins__.str(arg.__class__))
}
}
$ListDict.__eq__=function(self,other){
if(other===undefined){
return self===list
}
if(other.__class__===self.__class__){
if(other.length==self.length){
for(var i=0;i<self.length;i++){
if(!getattr(self[i],'__eq__')(other[i])){return False}
}
return True
}
}
return False
}
$ListDict.__getitem__=function(self,arg){
if(isinstance(arg,__builtins__.int)){
var items=self.valueOf()
var pos=arg
if(arg<0){pos=items.length+pos}
if(pos>=0 && pos<items.length){return items[pos]}
else{
throw __builtins__.IndexError('list index out of range')
}
}else if(isinstance(arg,slice)){
var step=arg.step===None ? 1 : arg.step
if(step>0){
var start=arg.start===None ? 0 : arg.start
var stop=arg.stop===None ? self.length : arg.stop
}else{
var start=arg.start===None ? self.length-1 : arg.start
var stop=arg.stop===None ? 0 : arg.stop
}
if(start<0){start=__builtins__.int(self.length+start)}
if(stop<0){stop=self.length+stop}
var res=[],i=null,items=self.valueOf()
if(step>0){
if(stop<=start){return res}
else{
for(var i=start;i<stop;i+=step){
if(items[i]!==undefined){res.push(items[i])}
else{res.push(None)}
}
return res
}
}else{
if(stop>=start){return res}
else{
for(var i=start;i>=stop;i+=step){
if(items[i]!==undefined){res.push(items[i])}
else{res.push(None)}
}
return res
}
}
}else if(isinstance(arg,bool)){
return $ListDict.__getitem__(self,__builtins__.int(arg))
}else{
throw __builtins__.TypeError('list indices must be integer, not '+arg.__class__.__name__)
}
}
$ListDict.__ge__=function(self,other){
if(!isinstance(other,list)){
throw __builtins__.TypeError("unorderable types: list() >= "+other.__class__.__name__+'()')
}
var i=0
while(i<self.length){
if(i>=other.length){return true}
else if(self[i]==other[i]){i++}
else return(self[i]>=other[i])
}
return false 
}
$ListDict.__gt__=function(self,other){
if(!isinstance(other,list)){
throw __builtins__.TypeError("unorderable types: list() > "+other.__class__.__name__+'()')
}
var i=0
while(i<self.length){
if(i>=other.length){return true}
else if(self[i]==other[i]){i++}
else return(self[i]>other[i])
}
return false 
}
$ListDict.__hash__=function(){throw __builtins__.TypeError("unhashable type: 'list'")}
$ListDict.__init__=function(self,arg){
var len_func=getattr(self,'__len__'),pop_func=getattr(self,'pop')
while(len_func()){pop_func()}
if(arg===undefined){return}
var arg=iter(arg)
var next_func=getattr(arg,'__next__')
while(true){
try{self.push(next_func())}
catch(err){if(err.__name__=='StopIteration'){__BRYTHON__.$pop_exc()};break}
}
}
var $list_iterator=$B.$iterator_class('list_iterator')
$ListDict.__iter__=function(self){
return $B.$iterator(self,$list_iterator)
}
$ListDict.__le__=function(self,other){
return !$ListDict.__gt__(self,other)
}
$ListDict.__len__=function(self){return self.length}
$ListDict.__lt__=function(self,other){
return !$ListDict.__ge__(self,other)
}
$ListDict.__mro__=[$ListDict,$ObjectDict]
$ListDict.__mul__=function(self,other){
if(isinstance(other,__builtins__.int)){return getattr(other,'__mul__')(self)}
else{
throw __builtins__.TypeError("can't multiply sequence by non-__builtins__.int of type '"+other.__class__.__name__+"'")
}
}
$ListDict.__ne__=function(self,other){return !$ListDict.__eq__(self,other)}
$ListDict.__new__=$B.$__new__(list)
$ListDict.__repr__=function(self){
if(self===undefined){return "<class 'list'>"}
var items=self.valueOf()
var res='['
if(self.__class__===$TupleDict){res='('}
for(var i=0;i<self.length;i++){
var x=self[i]
try{res+=getattr(x,'__repr__')()}
catch(err){console.log('no __repr__');res +=x.toString()}
if(i<self.length-1){res +=', '}
}
if(self.__class__===$TupleDict){
if(self.length==1){res+=','}
return res+')'
}
else{return res+']'}
}
$ListDict.__setitem__=function(self,arg,value){
if(isinstance(arg,__builtins__.int)){
var pos=arg
if(arg<0){pos=self.length+pos}
if(pos>=0 && pos<self.length){self[pos]=value}
else{throw __builtins__.IndexError('list index out of range')}
}else if(isinstance(arg,slice)){
var start=arg.start===None ? 0 : arg.start
var stop=arg.stop===None ? self.length : arg.stop
var step=arg.step===None ? 1 : arg.step
if(start<0){start=self.length+start}
if(stop<0){stop=self.length+stop}
self.splice(start,stop-start)
if(hasattr(value,'__iter__')){
var $temp=list(value)
for(var i=$temp.length-1;i>=0;i--){
self.splice(start,0,$temp[i])
}
}else{
throw __builtins__.TypeError("can only assign an iterable")
}
}else{
throw __builtins__.TypeError('list indices must be integer, not '+arg.__class__.__name__)
}
}
$ListDict.__str__=$ListDict.__repr__
$ListDict.append=function(self,other){self.push(other)}
$ListDict.clear=function(self){
while(self.length){self.pop()}
}
$ListDict.copy=function(self){
var res=[]
for(var i=0;i<self.length;i++){res.push(self[i])}
return res
}
$ListDict.count=function(self,elt){
var res=0
for(var i=0;i<self.length;i++){
if(getattr(self[i],'__eq__')(elt)){res++}
}
return res
}
$ListDict.extend=function(self,other){
if(arguments.length!=2){throw __builtins__.TypeError(
"extend() takes exactly one argument ("+arguments.length+" given)")}
other=iter(other)
while(true){
try{self.push(next(other))}
catch(err){
if(err.__name__=='StopIteration'){__BRYTHON__.$pop_exc();break}
else{throw err}
}
}
}
$ListDict.index=function(self,elt){
for(var i=0;i<self.length;i++){
if(getattr(self[i],'__eq__')(elt)){return i}
}
throw __builtins__.ValueError(__builtins__.str(elt)+" is not in list")
}
$ListDict.insert=function(self,i,item){self.splice(i,0,item)}
$ListDict.remove=function(self,elt){
for(var i=0;i<self.length;i++){
if(getattr(self[i],'__eq__')(elt)){
self.splice(i,1)
return
}
}
throw __builtins__.ValueError(__builtins__.str(elt)+" is not in list")
}
$ListDict.pop=function(self,pos){
if(pos===undefined){
var res=self[self.length-1]
self.splice(self.length-1,1)
return res
}else if(arguments.length==2){
if(isinstance(pos,__builtins__.int)){
var res=self[pos]
self.splice(pos,1)
return res
}else{
throw __builtins__.TypeError(pos.__class__+" object cannot be interpreted as an integer")
}
}else{
throw __builtins__.TypeError("pop() takes at most 1 argument ("+(arguments.length-1)+' given)')
}
}
$ListDict.reverse=function(self){
for(var i=0;i<parseInt(self.length/2);i++){
var buf=self[i]
self[i]=self[self.length-i-1]
self[self.length-i-1]=buf
}
}
function $partition(arg,array,begin,end,pivot)
{
var piv=array[pivot]
array=swap(array, pivot, end-1)
var store=begin
for(var ix=begin;ix<end-1;++ix){
if(getattr(arg(array[ix]),'__le__')(arg(piv))){
array=swap(array, store, ix)
++store
}
}
array=swap(array, end-1, store)
return store
}
function swap(_array,a,b){
var tmp=_array[a]
_array[a]=_array[b]
_array[b]=tmp
return _array
}
function $qsort(arg,array, begin, end)
{
if(end-1>begin){
var pivot=begin+Math.floor(Math.random()*(end-begin))
pivot=$partition(arg,array, begin, end, pivot)
$qsort(arg,array, begin, pivot)
$qsort(arg,array, pivot+1, end)
}
}
$ListDict.sort=function(self){
var func=function(x){return x}
var reverse=false
for(var i=1;i<arguments.length;i++){
var arg=arguments[i]
if(arg.__class__==__BRYTHON__.$KwDict){
if(arg.name==='key'){func=arg.value}
else if(arg.name==='reverse'){reverse=arg.value}
}
}
if(self.length==0){return}
$qsort(func,self,0,self.length)
if(reverse){$ListDict.reverse(self)}
if(!self.__brython__){return self}
}
$ListDict.toString=function(){return '$ListDict'}
$ListDict.__dict__=dict()
for(var $attr in list){
$ListDict.__dict__.$keys.push($attr)
$ListDict.__dict__.$values.push(list[$attr])
}
function list(){
if(arguments.length===0){return[]}
else if(arguments.length>1){
throw __builtins__.TypeError("list() takes at most 1 argument ("+arguments.length+" given)")
}
var res=[]
var arg=iter(arguments[0])
var next_func=getattr(arg,'__next__')
while(true){
try{res.push(next_func())}
catch(err){
if(err.__name__=='StopIteration'){
__BRYTHON__.$pop_exc()
}else{
}
break
}
}
res.__brython__=true 
return res
}
list.__class__=$B.$factory
list.$dict=$ListDict
$ListDict.$factory=list
function $tuple(arg){return arg}
var $TupleDict={__class__:$B.$type,__name__:'tuple',$native:true}
$TupleDict.__iter__=function(self){
return $B.$iterator(self,$tuple_iterator)
}
$TupleDict.toString=function(){return '$TupleDict'}
var $tuple_iterator=$B.$iterator_class('tuple_iterator')
function tuple(){
var obj=__builtins__.list.apply(null,arguments)
obj.__class__=$TupleDict
obj.__hash__=function(){
var x=0x345678
for(var i=0;i < args.length;i++){
var y=args[i].__hash__()
x=(1000003 * x)^ y & 0xFFFFFFFF
}
return x
}
return obj
}
tuple.__class__=$B.$factory
tuple.$dict=$TupleDict
$TupleDict.$factory=tuple
$TupleDict.__new__=$B.$__new__(tuple)
for(var attr in $ListDict){
if(['__delitem__','__setitem__',
'append','extend','insert','remove','pop','reverse','sort'].indexOf(attr)>-1){continue}
if($TupleDict[attr]===undefined){
$TupleDict[attr]=$ListDict[attr]
}
}
$TupleDict.__delitem__=function(){
throw __builtins__.TypeError("'tuple' object doesn't support item deletion")
}
$TupleDict.__setitem__=function(){
throw __builtins__.TypeError("'tuple' object does not support item assignment")
}
$TupleDict.__eq__=function(self,other){
if(other===undefined){
return self===tuple
}
return $ListDict.__eq__(self,other)
}
$TupleDict.__mro__=[$TupleDict,$ObjectDict]
$TupleDict.__name__='tuple'
$B.builtins.list=list
$B.builtins.tuple=tuple
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=object.$dict
var $StringDict={__class__:$B.$type,
__name__:'str',
$native:true
}
$StringDict.__add__=function(self,other){
if(!(typeof other==="string")){
try{return getattr(other,'__radd__')(self)}
catch(err){throw __builtins__.TypeError(
"Can't convert "+other.__class__.__name__+" to str implicitely")}
}else{
return self+other
}
}
$StringDict.__contains__=function(self,item){
if(!(typeof item==="string")){throw __builtins__.TypeError(
"'in <string>' requires string as left operand, not "+item.__class__)}
var nbcar=item.length
for(var i=0;i<self.length;i++){
if(self.substr(i,nbcar)==item){return True}
}
return False
}
$StringDict.__delitem__=function(){
throw __builtins__.TypeError("'str' object doesn't support item deletion")
}
$StringDict.__eq__=function(self,other){
if(other===undefined){
return self===str
}
return other===self.valueOf()
}
$StringDict.__getitem__=function(self,arg){
var i
if(isinstance(arg,__builtins__.int)){
var pos=arg
if(arg<0){pos=self.length+pos}
if(pos>=0 && pos<self.length){return self.charAt(pos)}
else{throw __builtins__.IndexError('string index out of range')}
}else if(isinstance(arg,slice)){
var step=arg.step===None ? 1 : arg.step
if(step>0){
var start=arg.start===None ? 0 : arg.start
var stop=arg.stop===None ? getattr(self,'__len__')(): arg.stop
}else{
var start=arg.start===None ? getattr(self,'__len__')()-1 : arg.start
var stop=arg.stop===None ? 0 : arg.stop
}
if(start<0){start=self.length+start}
if(stop<0){stop=self.length+stop}
var res='',i=null
if(step>0){
if(stop<=start){return ''}
else{
for(i=start;i<stop;i+=step){
res +=self.charAt(i)
}
}
}else{
if(stop>=start){return ''}
else{
for(i=start;i>=stop;i+=step){
res +=self.charAt(i)
}
}
}
return res
}else if(isinstance(arg,bool)){
return self.__getitem__(__builtins__.int(arg))
}
}
$StringDict.__hash__=function(self){
var hash=1
for(var i=0;i < self.length;i++){
hash=(101*hash + self.charCodeAt(i))& 0xFFFFFFFF
}
return hash
}
$StringDict.__init__=function(self,arg){
self.valueOf=function(){return arg}
self.toString=function(){return arg}
}
var $str_iterator=$B.$iterator_class('str_iterator')
$StringDict.__iter__=function(self){
var items=self.split('')
return $B.$iterator(items,$str_iterator)
}
$StringDict.__len__=function(self){return self.length}
var $legacy_format=$StringDict.__mod__=function(self,args){
var ph=[]
function format(s){
var conv_flags='([#\\+\\- 0])*'
var conv_types='[diouxXeEfFgGcrsa%]'
var re=new RegExp('\\%(\\(.+?\\))*'+conv_flags+'(\\*|\\d*)(\\.\\*|\\.\\d*)*(h|l|L)*('+conv_types+'){1}')
var res=re.exec(s)
this.is_format=true
if(!res){this.is_format=false;return}
this.src=res[0]
if(res[1]){this.mapping_key=str(res[1].substr(1,res[1].length-2))}
else{this.mapping_key=null}
this.flag=res[2]
this.min_width=res[3]
this.precision=res[4]
this.length_modifier=res[5]
this.type=res[6]
this.toString=function(){
var res='type '+this.type+' key '+this.mapping_key+' min width '+this.min_width
res +=' precision '+this.precision
return res
}
this.format=function(src){
if(this.mapping_key!==null){
if(!isinstance(src,__builtins__.dict)){throw __builtins__.TypeError("format requires a mapping")}
src=getattr(src,'__getitem__')(this.mapping_key)
}
if(this.type=="s"){
var res=str(src)
if(this.precision){res=res.substr(0,parseInt(this.precision.substr(1)))}
return res
}else if(this.type=="r"){
var res=repr(src)
if(this.precision){res=res.substr(0,parseInt(this.precision.substr(1)))}
return res
}else if(this.type=="a"){
var res=ascii(src)
if(this.precision){res=res.substr(0,parseInt(this.precision.substr(1)))}
return res
}else if(this.type=="g" || this.type=="G"){
if(!isinstance(src,[__builtins__.int,__builtins__.float])){throw __builtins__.TypeError(
"%"+this.type+" format : a number is required, not "+str(src.__class__))}
var prec=-4
if(this.precision){prec=parseInt(this.precision.substr(1))}
var res=parseFloat(src).toExponential()
var elts=res.split('e')
if((this.precision && eval(elts[1])>prec)||
(!this.precision && eval(elts[1])<-4)){
this.type==='g' ? this.type='e' : this.type='E'
var prec=6
if(this.precision){prec=parseInt(this.precision.substr(1))-1}
var res=parseFloat(src).toExponential(prec)
var elts=res.split('e')
var res=elts[0]+this.type+elts[1].charAt(0)
if(elts[1].length===2){res +='0'}
return res+elts[1].substr(1)
}else{
var prec=6
if(this.precision){prec=parseInt(this.precision.substr(1))-1}
var elts=str(src).split('.')
this.precision='.'+(prec-elts[0].length)
this.type="f"
return this.format(src)
}
}else if(this.type=="e" || this.type=="E"){
if(!isinstance(src,[__builtins__.int,__builtins__.float])){
throw __builtins__.TypeError(
"%"+this.type+" format : a number is required, not "+str(src.__class__))}
var prec=6
if(this.precision){prec=parseInt(this.precision.substr(1))}
var res=parseFloat(src).toExponential(prec)
var elts=res.split('e')
var res=elts[0]+this.type+elts[1].charAt(0)
if(elts[1].length===2){res +='0'}
return res+elts[1].substr(1)
}else if(this.type=="x" || this.type=="X"){
if(!isinstance(src,[__builtins__.int,__builtins__.float])){throw __builtins__.TypeError(
"%"+this.type+" format : a number is required, not "+str(src.__class__))}
var num=src
res=src.toString(16)
if(this.flag===' '){res=' '+res}
else if(this.flag==='+' && num>=0){res='+'+res}
else if(this.flag==='#'){
if(this.type==='x'){res='0x'+res}
else{res='0X'+res}
}
if(this.min_width){
var pad=' '
if(this.flag==='0'){pad="0"}
while(res.length<parseInt(this.min_width)){res=pad+res}
}
return res
}else if(this.type=="i" || this.type=="d"){
if(!isinstance(src,[__builtins__.int,__builtins__.float])){throw __builtins__.TypeError(
"%"+this.type+" format : a number is required, not "+str(src.__class__))}
var num=parseInt(src)
if(this.precision){num=num.toFixed(parseInt(this.precision.substr(1)))}
res=num+''
if(this.flag===' '){res=' '+res}
else if(this.flag==='+' && num>=0){res='+'+res}
if(this.min_width){
var pad=' '
if(this.flag==='0'){pad="0"}
while(res.length<parseInt(this.min_width)){res=pad+res}
}
return res
}else if(this.type=="f" || this.type=="F"){
if(!isinstance(src,[__builtins__.int,__builtins__.float])){throw __builtins__.TypeError(
"%"+this.type+" format : a number is required, not "+str(src.__class__))}
var num=parseFloat(src)
if(this.precision){num=num.toFixed(parseInt(this.precision.substr(1)))}
res=num+''
if(this.flag===' '){res=' '+res}
else if(this.flag==='+' && num>=0){res='+'+res}
if(this.min_width){
var pad=' '
if(this.flag==='0'){pad="0"}
while(res.length<parseInt(this.min_width)){res=pad+res}
}
return res
}else if(this.type=='c'){
if(isinstance(src,str)&& str.length==1){return src}
else if(isinstance(src,__builtins__.int)&& src>0 && src<256){return String.fromCharCode(src)}
else{throw __builtins__.TypeError('%c requires __builtins__.int or char')}
}
}
}
var elts=[]
var pos=0, start=0, nb_repl=0, is_mapping=null
var val=self.valueOf()
while(pos<val.length){
if(val.charAt(pos)=='%'){
var f=new format(val.substr(pos))
if(f.is_format){
if(f.type!=="%"){
elts.push(val.substring(start,pos))
elts.push(f)
start=pos+f.src.length
pos=start
nb_repl++
if(is_mapping===null){is_mapping=f.mapping_key!==null}
else if(is_mapping!==(f.mapping_key!==null)){
console.log(f+' not mapping')
throw __builtins__.TypeError('format required a mapping')
}
}else{
pos++;pos++
}
}else{pos++}
}else{pos++}
}
elts.push(val.substr(start))
if(!isinstance(args,__builtins__.tuple)){
if(args.__class__==__builtins__.dict.$dict && is_mapping){
for(var i=1;i<elts.length;i+=2){
elts[i]=elts[i].format(args)
}
}
else if(nb_repl>1){throw __builtins__.TypeError('not enough arguments for format string')}
else{elts[1]=elts[1].format(args)}
}else{
if(nb_repl==args.length){
for(var i=0;i<args.length;i++){
var fmt=elts[1+2*i]
elts[1+2*i]=fmt.format(args[i])
}
}else if(nb_repl<args.length){throw __builtins__.TypeError(
"not all arguments converted during string formatting")
}else{throw __builtins__.TypeError('not enough arguments for format string')}
}
var res=''
for(var i=0;i<elts.length;i++){res+=elts[i]}
res=res.replace(/%%/g,'%')
return res
}
$StringDict.__mro__=[$StringDict,$ObjectDict]
$StringDict.__mul__=function(self,other){
if(!isinstance(other,__builtins__.int)){throw __builtins__.TypeError(
"Can't multiply sequence by non-__builtins__.int of type '"+str(other.__class__)+"'")}
$res=''
for(var i=0;i<other;i++){$res+=self.valueOf()}
return $res
}
$StringDict.__ne__=function(self,other){return other!==self.valueOf()}
$StringDict.__or__=$ObjectDict.__or__
$StringDict.__repr__=function(self){
if(self===undefined){return "<class 'str'>"}
var qesc=new RegExp("'","g")
var res=self.replace(/\n/g,'\\\\n')
res="'"+res.replace(qesc,"\\'")+"'"
return res
}
$StringDict.__setattr__=function(self,attr,value){setattr(self,attr,value)}
$StringDict.__setitem__=function(self,attr,value){
throw __builtins__.TypeError("'str' object does not support item assignment")
}
$StringDict.__str__=function(self){
if(self===undefined){return "<class 'str'>"}
else{return self.toString()}
}
$StringDict.toString=function(){return 'string!'}
var $comp_func=function(self,other){
if(typeof other !=="string"){throw __builtins__.TypeError(
"unorderable types: 'str' > "+other.__class__+"()")}
return self > other
}
$comp_func +='' 
var $comps={'>':'gt','>=':'ge','<':'lt','<=':'le'}
for(var $op in $comps){
eval("$StringDict.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))
}
var $notimplemented=function(self,other){
throw NotImplementedError("OPERATOR not implemented for class str")
}
$notimplemented +='' 
for(var $op in $B.$operators){
var $opfunc='__'+$B.$operators[$op]+'__'
if(!($opfunc in str)){
}
}
$StringDict.capitalize=function(self){
if(self.length==0){return ''}
return self.charAt(0).toUpperCase()+self.substr(1).toLowerCase()
}
$StringDict.casefold=function(self){
throw NotImplementedError("function casefold not implemented yet")
}
$StringDict.center=function(self,width,fillchar){
if(fillchar===undefined){fillchar=' '}else{fillchar=fillchar}
if(width<=self.length){return self}
else{
var pad=parseInt((width-self.length)/2)
var res=Array(pad+1).join(fillchar)
res=res + self + res
if(res.length<width){res +=fillchar}
return res
}
}
$StringDict.count=function(self,elt){
if(!(typeof elt==="string")){throw __builtins__.TypeError(
"Can't convert '"+elt.__class__.__name__+"' object to str implicitly")}
var n=0, pos=0
while(true){
pos=self.indexOf(elt,pos)
if(pos>=0){n++;pos+=elt.length}else break
}
return n
}
$StringDict.decode=function(self){
return self 
}
$StringDict.encode=function(self){
return self 
}
$StringDict.endswith=function(self){
var args=[]
for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
var start=null,end=null
var $ns=$B.$MakeArgs("$StringDict.endswith",args,['suffix'],
['start','end'],null,null)
var suffixes=$ns['suffix']
if(!isinstance(suffixes,__builtins__.tuple)){suffixes=[suffixes]}
start=$ns['start']|| start
end=$ns['end']|| self.length-1
var s=self.substr(start,end+1)
for(var i=0;i<suffixes.length;i++){
suffix=suffixes[i]
if(suffix.length<=s.length &&
s.substr(s.length-suffix.length)==suffix){return True}
}
return False
}
$StringDict.expandtabs=function(self){
throw NotImplementedError("function expandtabs not implemented yet")
}
$StringDict.find=function(self){
var start=0,end=self.length
var $ns=$B.$MakeArgs("$StringDict.find",arguments,['self','sub'],
['start','end'],null,null)
for(var attr in $ns){eval('var '+attr+'=$ns[attr]')}
if(!isinstance(sub,str)){throw __builtins__.TypeError(
"Can't convert '"+sub.__class__.__name__+"' object to str implicitly")}
if(!isinstance(start,__builtins__.int)||!isinstance(end,__builtins__.int)){throw __builtins__.TypeError(
"slice indices must be integers or None or have an __index__ method")}
var s=self.substring(start,end)
var escaped=['[','.','*','+','?','|','(',')','$','^']
var esc_sub=''
for(var i=0;i<sub.length;i++){
if(escaped.indexOf(sub.charAt(i))>-1){esc_sub +='\\'}
esc_sub +=sub.charAt(i)
}
var res=s.search(esc_sub)
if(res==-1){return -1}
else{return start+res}
}
var $FormattableString=function(format_string){
this.format_string=format_string
this._prepare=function(match){
if(match.substring(0,1)==match.substring(match.length)){
return match.substring(0, __builtins__.int(match.length/2))
}
var _repl
if(match.length >=2){
_repl=''
}else{
_repl=match.substring(1)
}
var _out=getattr(_repl, 'partition')(':')
var _field=_out[0]
var _dummy=_out[1]
var _format_spec=_out[2]
_out=getattr(_field, 'partition')('!')
var _literal=_out[0]
var _sep=_out[1]
var _conversion=_out[2]
if(_sep && ! _conversion){
throw __builtins__.ValueError("end of format while looking for conversion specifier")
}
if(_conversion.length > 1){
throw __builtins__.ValueError("expected ':' after format specifier")
}
if('rsa'.indexOf(_conversion)==-1){
throw __builtins__.ValueError("Unknown conversation specifier " + _conversion)
}
_name_parts=this.field_part(_literal)
var _start=_literal.substring(0,1)
var _name=''
if(_start=='' || '.['.indexOf(_start)!=-1){
if(this._index===undefined){
throw __builtins__.ValueError("cannot switch from manual field specification to automatic field numbering")
}
_name=self._index.toString()
this._index=1
if(! _literal ){
_name_parts.shift()
}
}else{
_name=_name_parts.shift()[1]
if(this._index !==undefined && !isNaN(_name)){
if(this._index){
throw __builtins__.ValueError("cannot switch from automatic field " +
"numbering to manual field specification")
this._index=undefined
}
}
}
var _empty_attribute=false
var _k
for(var i=0;i < _name_parts.length;i++){
_k=_name_parts[i][0]
var _v=_name_parts[i][1]
var _tail=_name_parts[i][2]
if(_v==''){_empty_attribute=true}
if(_tail !==undefined){
throw __builtins__.ValueError("Only '.' or '[' may follow ']' " +
"in format field specifier")
}
}
if(_name_parts && _k=='[' && ! 
_literal.substring(_literal.length)==']'){
throw __builtins__.ValueError("Missing ']' in format string")
}
if(_empty_attribute){
throw __builtins__.ValueError("Empty attribute in format string")
}
var _rv=''
if(_format_spec.indexOf('{')!=-1){
_format_spec=this.format_sub_re.replace(_format_spec, this._prepare)
_rv=[_name_parts, _conversion, _format_spec]
if(this._nested[_name]===undefined){
this._nested[_name]=[]
this._nested_array.push(_name)
}
this._nested[_name].push(_rv)
}else{
_rv=[_name_parts, _conversion, _format_spec]
if(this._kwords[_name]===undefined){
this._kwords[_name]=[]
this._kwords_array.push(_name)
}
this._kwords[_name].push(_rv)
}
return '%(' + id(_rv)+ ')s'
}
this.format=function(){
var $ns=$B.$MakeArgs('format',arguments,[],[],'args','kwargs')
var args=$ns['args']
var kwargs=$ns['kwargs']
if(args){
for(var i=0;i < args[0].length;i++){
getattr(kwargs, '__setitem__')(str(i), args[0][i])
}
}
var _want_bytes=isinstance(this._string, str)
var _params=__builtins__.dict()
for(var i=0;i < this._kwords_array.length;i++){
var _name=this._kwords_array[i]
var _items=this._kwords[_name]
var _var=getattr(kwargs, '__getitem__')(_name)
var _value
if(hasattr(_var, 'value')){
_value=getattr(getattr(kwargs, '__getitem__')(_name), 'value')
}else{
_value=_var
}
for(var j=0;j < _items.length;j++){
var _parts=_items[j][0]
var _conv=_items[j][1]
var _spec=_items[j][2]
getattr(_params,'__setitem__')(id(_items[j]).toString(), this.format_field(_value, _parts, 
_conv, _spec, _want_bytes))
}
}
for(var i=0;i < this._nested_array.length;i++){
var _name=this._nested_array[i]
var _items=this._nested[i]
var _var=getattr(kwargs, '__getitem__')(_name)
var _value
if(hasattr(_var, 'value')){
_value=getattr(getattr(kwargs, '__getitem__')(_name), 'value')
}else{
_value=_var
}
for(var j=0;j < _items.length;j++){
var _parts=_items[j][0]
var _conv=_items[j][1]
var _spec=_items[j][2]
_spec=$legacy_format(_spec, _params)
getattr(_params,'__setitem__')(id(_items[j]).toString(), this.format_field(_value, _parts, 
_conv, _spec, _want_bytes))
}
}
return $legacy_format(this._string, _params)
}
this.format_field=function(value,parts,conv,spec,want_bytes){
if(want_bytes===undefined)want_bytes=False
for(var i=0;i < parts.length;i++){
var _k=parts[i][0]
var _part=parts[i][1]
if(_k){
if(!isNaN(_part)){
value=value[parseInt(_part)]
}else{
value=value[_part]
}
}else{
value=value[_part]
}
}
if(conv){
value=$legacy_format((conv=='r')&& '%r' || '%s', value)
}
value=this.strformat(value, spec)
if(want_bytes){
return value.toString()
}
return value
}
this.strformat=function(value, format_spec){
if(format_spec===undefined)format_spec=''
var _m=this.format_spec_re.test(format_spec)
if(!_m){
throw __builtins__.ValueError('Invalid conversion specification')
}
var _match=this.format_spec_re.exec(format_spec)
var _align=_match[0]
var _sign=_match[1]
var _prefix=_match[2]
var _width=_match[3]
var _comma=_match[4]
var _precision=_match[5]
var _conversion=_match[6]
var _is_numeric=isinstance(value, __builtins__.float)
var _is_integer=isinstance(value, __builtins__.int)
if(_prefix && ! _is_numeric){
if(_is_numeric){
throw __builtins__.ValueError('Alternate form (#) not allowed in float format specifier')
}else{
throw __builtins__.ValueError('Alternate form (#) not allowed in string format specification')
}
}
if(_is_numeric && _conversion=='n'){
_conversion=_is_integer && 'd' || 'g'
}else{
if(_sign){
if(! _is_numeric){
throw __builtins__.ValueError('Sign not allowd in string format specifification')
}
if(_conversation=='c'){
throw("Sign not allowd with integer format specifier 'c'")
}
}
}
if(_comma){
}
var _rv
if(_conversion !='' &&((_is_numeric && _conversion=='s')|| 
(! _is_integer && 'cdoxX'.indexOf(_conversion)!=-1))){
throw __builtins__.ValueError('Fix me')
}
if(_conversion=='c'){
_conversion='s'
}
_rv='%' + _prefix + _precision +(_conversion || 's')
_rv=$legacy_format(_rv, value)
if(_sign !='-' && value >=0){
_rv=_sign + _rv
}
var _zero=False
if(_width){
_zero=width.substring(0,1)=='0'
_width=parseInt(_width)
}else{
_width=0
}
if(_width <=_rv.length){
if(! _is_numeric &&(_align=='=' ||(_zero && ! _align))){
throw __builtins__.ValueError("'=' alignment not allowd in string format specifier")
}
return _rv
}
_fill=_align.substring(0,_align.length-1)
_align=_align.substring(_align.length)
if(! _fill){_fill=_zero && '0' || ' '}
if(_align=='^'){
_padding=_width - _rv.length
if(_padding % 2){
_rv=getattr(_rv, 'center')(_width, _fill)
}
}else if(_align=='=' ||(_zero && ! _align)){
if(! _is_numeric){
throw __builtins__.ValueError("'=' alignment not allowd in string format specifier")
}
if(_value < 0 || _sign !='-'){
_rv=_rv.substring(0,1)+ getattr(_rv.substring(1),'rjust')(_width - 1, _fill)
}else{
_rv=getattr(_rv, 'rjust')(_width, _fill)
}
}else if((_align=='>' || _align=='=')||(_is_numeric && ! _aligned)){
_rv=getattr(_rv, 'rjust')(_width, _fill)
}else{
_rv=getattr(_rv, 'ljust')(_width, _fill)
}
return _rv
}
this.field_part=function(literal){
var _matches=[]
var _pos=0
if(literal.length==0){_matches.push(['','',''])}
while(_pos < literal.length){
var _start='', _middle='', _end=''
if(literal.substring(_pos,1)=='['){
_start='['
_pos++
while(_pos < literal.length && literal.substring(_pos,1)!==']'){
_middle +=literal.substring(_pos,1)
_pos++
}
if(literal.substring(_pos, 1)==']')_end=']'
}else{
if(literal.substring(_pos,1)=='.'){
_start='.'
_pos++
}
while(_pos < literal.length &&
literal.substring(_pos,1)!=='[' && 
literal.substring(_pos,1)!=='.'){
_middle +=literal.substring(_pos,1)
_pos++
}
}
_matches.push([_start, _middle, _end])
}
return _matches
}
this.format_str_re=new RegExp(
'(%)' +
'|((?!{)(?:{{)+' +
'|(?:}})+(?!})' +
'|{(?:[^{](?:[^{}]+|{[^{}]*})*)?})', 'g'
)
this.format_sub_re=new RegExp('({[^{}]*})')
this.format_spec_re=new RegExp(
'((?:[^{}]?[<>=^])?)' + 
'([\\-\\+ ]?)' + 
'(#?)' + '(\\d*)' + '(,?)' + 
'((?:\.\\d\\+)?)' + 
'(.?)$' 
)
this._index=0
this._kwords={}
this._kwords_array=[]
this._nested={}
this._nested_array=[]
this._string=format_string.replace(this.format_str_re, this._prepare, 'g')
return this
}
$StringDict.format=function(self){
var _fs=$FormattableString(self.valueOf())
var args=[]
for(var i=1;i < arguments.length;i++){args.push(arguments[i])}
return _fs.format(args)
}
$StringDict.format_map=function(self){
throw NotImplementedError("function format_map not implemented yet")
}
$StringDict.index=function(self){
var res=$StringDict.find.apply(self,arguments)
if(res===-1){throw __builtins__.ValueError("substring not found")}
else{return res}
}
$StringDict.isalnum=function(self){
var pat=/^[a-z0-9]+$/i
return pat.test(self)
}
$StringDict.isalpha=function(self){
var pat=/^[a-z]+$/i
return pat.test(self)
}
$StringDict.isdecimal=function(self){
var pat=/^[0-9]+$/
return pat.test(self)
}
$StringDict.isdigit=function(self){
var pat=/^[0-9]+$/
return pat.test(self)
}
$StringDict.isidentifier=function(self){
var keywords=['False', 'None', 'True', 'and', 'as', 'assert', 'break',
'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal',
'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
if(keywords.indexOf(self)>-1)return True
var pat=/^[a-z][0-9a-z_]+$/i
return pat.test(self)
}
$StringDict.islower=function(self){
var pat=/^[a-z]+$/
return pat.test(self)
}
$StringDict.isnumeric=function(self){
var pat=/^[0-9]+$/
return pat.test(self)
}
$StringDict.isprintable=function(self){
var re=/[^ -~]/
return !re.test(self)
}
$StringDict.isspace=function(self){
var pat=/^\s+$/i
return pat.test(self)
}
$StringDict.istitle=function(self){
var pat=/^([A-Z][a-z]+)(\s[A-Z][a-z]+)$/i
return pat.test(self)
}
$StringDict.isupper=function(self){
var pat=/^[A-Z]+$/
return pat.test(self)
}
$StringDict.join=function(self,obj){
var iterable=iter(obj)
var res='',count=0
while(true){
try{
var obj2=next(iterable)
if(!isinstance(obj2,str)){throw __builtins__.TypeError(
"sequence item "+count+": expected str instance, "+obj2.__class__+"found")}
res +=obj2+self
count++
}catch(err){
if(err.__name__==='StopIteration'){$B.$pop_exc();break}
else{throw err}
}
}
if(count==0){return ''}
res=res.substr(0,res.length-self.length)
return res
}
$StringDict.ljust=function(self, width, fillchar){
if(width <=self.length)return self
if(fillchar===undefined){fillchar=' '}
return self + Array(width - self.length + 1).join(fillchar)
}
$StringDict.lower=function(self){
return self.toLowerCase()
}
$StringDict.lstrip=function(self,x){
var pattern=null
if(x==undefined){pattern="\\s*"}
else{pattern="["+x+"]*"}
var sp=new RegExp("^"+pattern)
return self.replace(sp,"")
}
$StringDict.maketrans=function(self){
throw NotImplementedError("function maketrans not implemented yet")
}
$StringDict.partition=function(self,sep){
if(sep===undefined){
throw Error("sep argument is required")
return
}
var i=self.indexOf(sep)
if(i==-1){return __builtins__.tuple([self, '', ''])}
return __builtins__.tuple([self.substring(0,i), sep, self.substring(i+sep.length)])
}
function $re_escape(str)
{
var specials="[.*+?|()$^"
for(var i=0;i<specials.length;i++){
var re=new RegExp('\\'+specials.charAt(i),'g')
str=str.replace(re, "\\"+specials.charAt(i))
}
return str
}
$StringDict.replace=function(self,old,_new,count){
if(count!==undefined){
if(!isinstance(count,[__builtins__.int,__builtins__.float])){throw __builtins__.TypeError(
"'"+str(count.__class__)+"' object cannot be interpreted as an integer")}
var re=new RegExp($re_escape(old),'g')
var res=self.valueOf()
while(count>0){
if(self.search(re)==-1){return res}
res=res.replace(re,_new)
count--
}
return res
}else{
var re=new RegExp($re_escape(old),"g")
return self.replace(re,_new)
}
}
$StringDict.rfind=function(self){
var start=0,end=self.length
var $ns=$B.$MakeArgs("$StringDict.find",arguments,['self','sub'],
['start','end'],null,null)
for(var attr in $ns){eval('var '+attr+'=$ns[attr]')}
if(!isinstance(sub,str)){throw __builtins__.TypeError(
"Can't convert '"+sub.__class__.__name__+"' object to str implicitly")}
if(!isinstance(start,__builtins__.int)||!isinstance(end,__builtins__.int)){throw __builtins__.TypeError(
"slice indices must be integers or None or have an __index__ method")}
var s=self.substring(start,end)
var reversed=''
for(var i=s.length-1;i>=0;i--){reversed +=s.charAt(i)}
var res=reversed.search($re_escape(sub))
if(res==-1){return -1}
else{return start+s.length-1-res-sub.length+1}
}
$StringDict.rindex=function(){
var res=$StringDict.rfind.apply(this,arguments)
if(res==-1){throw __builtins__.ValueError("substring not found")}
else{return res}
}
$StringDict.rjust=function(self){
var fillchar=' '
var $ns=$B.$MakeArgs("$StringDict.rjust",arguments,['self','width'],
['fillchar'],null,null)
for(var attr in $ns){eval('var '+attr+'=$ns[attr]')}
if(width <=self.length)return self
return Array(width - self.length + 1).join(fillchar)+ self
}
$StringDict.rpartition=function(self,sep){
if(sep===undefined){
throw Error("sep argument is required")
return
}
var pos=self.length-sep.length
while(true){
if(self.substr(pos,sep.length)==sep){
return __builtins__.tuple([self.substr(0,pos),sep,self.substr(pos+sep.length)])
}else{
pos--
if(pos<0){return __builtins__.tuple(['','',self])}
}
}
}
$StringDict.rsplit=function(self){
var args=[]
for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
var $ns=$B.$MakeArgs("$StringDict.split",args,[],[],'args','kw')
var sep=None,maxsplit=-1
if($ns['args'].length>=1){sep=$ns['args'][0]}
if($ns['args'].length==2){maxsplit=$ns['args'][1]}
maxsplit=$ns['kw'].get('maxsplit',maxsplit)
var array=$StringDict.split(self)
if(array.length <=maxsplit){
return array
}
var s=[], j=1
for(var i=0;i < maxsplit - array.length;i++){
if(i < maxsplit - array.length){
if(i > 0){s[0]+=sep}
s[0]+=array[i]
}else{
s[j]=array[i]
j+=1
}
}
return __builtins__.tuple(s)
}
$StringDict.rstrip=function(self,x){
if(x==undefined){var pattern="\\s*"}
else{var pattern="["+x+"]*"}
sp=new RegExp(pattern+'$')
return str(self.replace(sp,""))
}
$StringDict.split=function(self){
var args=[]
for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
var $ns=$B.$MakeArgs("$StringDict.split",args,[],[],'args','kw')
var sep=None,maxsplit=-1
if($ns['args'].length>=1){sep=$ns['args'][0]}
if($ns['args'].length==2){maxsplit=$ns['args'][1]}
maxsplit=__builtins__.dict.$dict.get($ns['kw'],'maxsplit',maxsplit)
if(sep===None){
var res=[]
var pos=0
while(pos<self.length&&self.charAt(pos).search(/\s/)>-1){pos++}
if(pos===self.length-1){return[]}
var name=''
while(true){
if(self.charAt(pos).search(/\s/)===-1){
if(name===''){name=self.charAt(pos)}
else{name+=self.charAt(pos)}
}else{
if(name!==''){
res.push(name)
if(maxsplit!==-1&&res.length===maxsplit+1){
res.pop()
res.push(name+self.substr(pos))
return res
}
name=''
}
}
pos++
if(pos>self.length-1){
if(name){res.push(name)}
break
}
}
return res
}else{
var escaped=['*','.','[',']','(',')','|','$','^']
var esc_sep=''
for(var i=0;i<sep.length;i++){
if(escaped.indexOf(sep.charAt(i))>-1){esc_sep +='\\'}
esc_sep +=sep.charAt(i)
}
var re=new RegExp(esc_sep)
if(maxsplit==-1){
var a=self.split(re,maxsplit)
}else{
var l=self.split(re,-1)
var a=l.splice(0, maxsplit)
var b=l.splice(maxsplit-1, l.length)
a.push(b.join(sep))
}
return a
}
}
$StringDict.splitlines=function(self){
return $StringDict.split(self,'\n')
}
$StringDict.startswith=function(self){
var $ns=$B.$MakeArgs("$StringDict.startswith",arguments,['self','prefix'],
['start','end'],null,null)
var prefixes=$ns['prefix']
if(!isinstance(prefixes,__builtins__.tuple)){prefixes=[prefixes]}
var start=$ns['start']|| 0
var end=$ns['end']|| self.length-1
var s=self.substr(start,end+1)
for(var i=0;i<prefixes.length;i++){
var prefix=prefixes[i]
if(prefix.length<=s.length &&
s.substr(0,prefix.length)==prefix){return True}
}
return False
}
$StringDict.strip=function(self,x){
if(x==undefined){x="\\s"}
return $StringDict.rstrip($StringDict.lstrip(self,x),x)
}
$StringDict.swapcase=function(self){
return self.replace(/([a-z])|([A-Z])/g, function($0,$1,$2)
{return($1)? $0.toUpperCase(): $0.toLowerCase()
})
}
$StringDict.title=function(self){
return self.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase()+ txt.substr(1).toLowerCase();})
}
$StringDict.translate=function(self,table){
var res=''
if(isinstance(table, __builtins__.dict)){
for(var i=0;i<self.length;i++){
var repl=__builtins__.dict.$dict.get(table,self.charCodeAt(i),-1)
if(repl==-1){res +=self.charAt(i)}
else if(repl!==None){res +=repl}
}
}
return res
}
$StringDict.upper=function(self){return self.toUpperCase()}
$StringDict.zfill=function(self, width){
if(width===undefined || width <=self.length){
return self
}
if(!self.isnumeric()){
return self
}
return Array(width - self.length +1).join('0')
}
function str(arg){
if(arg===undefined){return ''}
else{
try{
var f=getattr(arg,'__str__')
return f()
}
catch(err){
$B.$pop_exc()
try{
var f=getattr(arg,'__repr__')
return f()
}catch(err){
$B.$pop_exc()
console.log(err+'\ndefault to toString '+arg);return arg.toString()
}
}
}
}
str.__class__=$B.$factory
str.$dict=$StringDict
$StringDict.$factory=str
$StringDict.__new__=function(cls){
if(cls===undefined){
throw __builtins__.TypeError('str.__new__(): not enough arguments')
}
var res={__class__:cls.$dict}
return res
}
var $StringSubclassDict={
__class__:$B.$type,
__name__:'str'
}
for(var $attr in $StringDict){
if(typeof $StringDict[$attr]=='function'){
$StringSubclassDict[$attr]=(function(attr){
return function(){
var args=[]
if(arguments.length>0){
var args=[arguments[0].valueOf()]
for(var i=1;i<arguments.length;i++){
args.push(arguments[i])
}
}
return $StringDict[attr].apply(null,args)
}
})($attr)
}
}
$StringSubclassDict.__mro__=[$StringSubclassDict,$ObjectDict]
var $StringSubclassFactory={
__class__:$B.$factory,
$dict:$StringSubclassDict
}
$B.builtins.str=str
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $SetDict={
__class__:$B.$type,
__name__:'set',
$native:true
}
$SetDict.__add__=function(self,other){
return set(self.$items.concat(other.$items))
}
$SetDict.__and__=function(self,other){
var res=set()
for(var i=0;i<self.$items.length;i++){
if(getattr(other,'__contains__')(self.$items[i])){
$SetDict.add(res,self.$items[i])
}
}
return res
}
$SetDict.__contains__=function(self,item){
for(var i=0;i<self.$items.length;i++){
try{if(getattr(self.$items[i],'__eq__')(item)){return True}
}catch(err){void(0)}
}
return False
}
$SetDict.__eq__=function(self,other){
if(other===undefined){
return self===set
}
if(isinstance(other,set)){
if(other.$items.length==self.$items.length){
for(var i=0;i<self.$items.length;i++){
if($SetDict.__contains__(self,other.$items[i])===False){
return False
}
}
return True
}
}
return False
}
$SetDict.__ge__=function(self,other){
return !$SetDict.__lt__(self,other)
}
$SetDict.__gt__=function(self,other){
return !$SetDict.__le__(self,other)
}
$SetDict.__hash__=function(self){throw __builtins__.TypeError("unhashable type: 'set'");}
$SetDict.__init__=function(self){
var args=[]
for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
self.$items=[]
if(args.length==0){return}
else if(args.length==1){
var arg=args[0]
if(isinstance(arg,set)){
self.$items=arg.$items
return
}
try{
var iterable=iter(arg)
var obj={$items:[]}
while(true){
try{$SetDict.add(obj,next(iterable))}
catch(err){
if(err.__name__=='StopIteration'){$B.$pop_exc();break}
throw err
}
}
self.$items=obj.$items
}catch(err){
console.log(''+err)
throw __builtins__.TypeError("'"+arg.__class__.__name__+"' object is not iterable")
}
}else{
throw __builtins__.TypeError("set expected at most 1 argument, got "+args.length)
}
}
var $set_iterator=$B.$iterator_class('set iterator')
$SetDict.__iter__=function(self){
return $B.$iterator(self.$items,$set_iterator)
}
$SetDict.__le__=function(self,other){
for(var i=0;i<self.$items.length;i++){
if(!getattr(other,'__contains__')(self.$items[i])){return false}
}
return true
}
$SetDict.__len__=function(self){return self.$items.length}
$SetDict.__lt__=function(self,other){
return $SetDict.__le__(self,other)&&$SetDict.__len__(self)<getattr(other,'__len__')()
}
$SetDict.__mro__=[$SetDict,__builtins__.object.$dict]
$SetDict.__ne__=function(self,other){return !$SetDict.__eq__(self,other)}
$SetDict.__or__=function(self,other){
var res=$SetDict.copy(self)
for(var i=0;i<other.$items.length;i++){
$SetDict.add(res,other.$items[i])
}
return res
}
$SetDict.__repr__=function(self){
if(self===undefined){return "<class 'set'>"}
var head='',tail=''
frozen=self.$real==='frozen'
if(self.$items.length===0){
if(frozen){return 'frozenset()'}
else{return 'set()'}
}
if(self.__class__===$SetDict && frozen){
head='frozenset('
tail=')'
}else if(self.__class__!==$SetDict){
head=self.__class__.__name__+'('
tail=')'
}
var res="{"
for(var i=0;i<self.$items.length;i++){
res +=repr(self.$items[i])
if(i<self.$items.length-1){res +=','}
}
res +='}'
return head+res+tail
}
$SetDict.__str__=$SetDict.toString=$SetDict.__repr__
$SetDict.__sub__=function(self,other){
var res=set()
for(var i=0;i<self.$items.length;i++){
if(!getattr(other,'__contains__')(self.$items[i])){
res.$items.push(self.$items[i])
}
}
return res
}
$SetDict.__xor__=function(self,other){
var res=set()
for(var i=0;i<self.$items.length;i++){
if(!getattr(other,'__contains__')(self.$items[i])){
$SetDict.add(res,self.$items[i])
}
}
for(var i=0;i<other.$items.length;i++){
if(!$SetDict.__contains__(self,other.$items[i])){
$SetDict.add(res,other.$items[i])
}
}
return res
}
$SetDict.add=function(self,item){
for(var i=0;i<self.$items.length;i++){
try{if(getattr(item,'__eq__')(self.$items[i])){return}}
catch(err){void(0)}
}
self.$items.push(item)
}
$SetDict.clear=function(self){
self.$items=[]
}
$SetDict.copy=function(self){
var res=set()
for(var i=0;i<self.$items.length;i++){res.$items[i]=self.$items[i]}
return res
}
$SetDict.discard=function(self,item){
try{$SetDict.remove(self,item)}
catch(err){if(err.__name__!=='KeyError'){throw err}}
}
$SetDict.isdisjoint=function(self,other){
for(var i=0;i<self.$items.length;i++){
if(getattr(other,'__contains__')(self.$items[i])){return false}
}
return true 
}
$SetDict.pop=function(self){
if(self.$items.length===0){throw KeyError('pop from an empty set')}
return self.$items.pop()
}
$SetDict.remove=function(self,item){
for(var i=0;i<self.$items.length;i++){
if(getattr(self.$items[i],'__eq__')(item)){
self.$items.splice(i,1)
return None
}
}
throw KeyError(item)
}
$SetDict.difference=$SetDict.__sub__
$SetDict.intersection=$SetDict.__and__
$SetDict.issubset=$SetDict.__le__
$SetDict.issuperset=$SetDict.__ge__
$SetDict.union=$SetDict.__or__
function set(){
var res={__class__:$SetDict}
var args=[res]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
$SetDict.__init__.apply(null,args)
return res
}
set.__class__=$B.$factory
set.$dict=$SetDict
$SetDict.$factory=set
$SetDict.__new__=$B.$__new__(set)
var $FrozensetDict={__class__:$B.$type,
__name__:'frozenset',
}
$FrozensetDict.__mro__=[$FrozensetDict,object.$dict]
$FrozensetDict.__repr__=function(self){
if(self===undefined){return "<class 'frozenset'>"}
if(self.$items.length===0){return 'frozenset()'}
var res="{"
for(var i=0;i<self.$items.length;i++){
res +=repr(self.$items[i])
if(i<self.$items.length-1){res +=','}
}
res +='}'
return 'frozenset('+res+')'
}
$FrozensetDict.__str__=$FrozensetDict.toString=$FrozensetDict.__repr__
for(var attr in $SetDict){
if($FrozensetDict[attr]!==undefined){continue}
else if(['add','clear','discard','pop','remove'].indexOf(attr)>-1){continue}
$FrozensetDict[attr]=$SetDict[attr]
}
function frozenset(){
var res=set.apply(null,arguments)
res.__class__=$FrozensetDict
return res
}
frozenset.__class__=$B.$factory
frozenset.$dict=$FrozensetDict
$FrozensetDict.__new__=$B.$__new__(frozenset)
$FrozensetDict.$factory=frozenset
__builtins__.set=set
__builtins__.frozenset=frozenset
})(__BRYTHON__)
;(function($B){
var __builtins__=$B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
var $ObjectDict=object.$dict
var $JSObject=__BRYTHON__.$JSObject
var JSObject=__BRYTHON__.JSObject
function $getMouseOffset(target, ev){
ev=ev || window.event
var docPos=$getPosition(target)
var mousePos=$mouseCoords(ev)
return{x:mousePos.x - docPos.x, y:mousePos.y - docPos.y}
}
function $getPosition(e){
var left=0
var top=0
var width=e.offsetWidth
var height=e.offsetHeight
while(e.offsetParent){
left +=e.offsetLeft
top +=e.offsetTop
e=e.offsetParent
}
left +=e.offsetLeft
top +=e.offsetTop
return{left:left, top:top, width:width, height:height}
}
function $mouseCoords(ev){
var posx=0
var posy=0
if(!ev)var ev=window.event
if(ev.pageX || ev.pageY){
posx=ev.pageX
posy=ev.pageY
}else if(ev.clientX || ev.clientY){
posx=ev.clientX + document.body.scrollLeft
+ document.documentElement.scrollLeft
posy=ev.clientY + document.body.scrollTop
+ document.documentElement.scrollTop
}
var res=object()
res.x=__builtins__.int(posx)
res.y=__builtins__.int(posy)
res.__getattr__=function(attr){return this[attr]}
res.__class__="MouseCoords"
return res
}
var $DOMNodeAttrs=['nodeName','nodeValue','nodeType','parentNode',
'childNodes','firstChild','lastChild','previousSibling','nextSibling',
'attributes','ownerDocument']
$B.$isNode=function(obj){
for(var i=0;i<$DOMNodeAttrs.length;i++){
if(obj[$DOMNodeAttrs[i]]===undefined){return false}
}
return true
}
$B.$isNodeList=function(nodes){
try{
var result=Object.prototype.toString.call(nodes)
return(typeof nodes==='object'
&& /^\[object(HTMLCollection|NodeList|Object)\]$/.test(result)
&& nodes.hasOwnProperty('length')
&&(nodes.length==0 ||(typeof nodes[0]==="object" && nodes[0].nodeType > 0))
)
}catch(err){
return false
}
}
var $DOMEventAttrs_W3C=['NONE','CAPTURING_PHASE','AT_TARGET','BUBBLING_PHASE',
'type','target','currentTarget','eventPhase','bubbles','cancelable','timeStamp',
'stopPropagation','preventDefault','initEvent']
var $DOMEventAttrs_IE=['altKey','altLeft','button','cancelBubble',
'clientX','clientY','contentOverflow','ctrlKey','ctrlLeft','data',
'dataFld','dataTransfer','fromElement','keyCode','nextPage',
'offsetX','offsetY','origin','propertyName','reason','recordset',
'repeat','screenX','screenY','shiftKey','shiftLeft',
'source','srcElement','srcFilter','srcUrn','toElement','type',
'url','wheelDelta','x','y']
$B.$isEvent=function(obj){
flag=true
for(var i=0;i<$DOMEventAttrs_W3C.length;i++){
if(obj[$DOMEventAttrs_W3C[i]]===undefined){flag=false;break}
}
if(flag){return true}
for(var i=0;i<$DOMEventAttrs_IE.length;i++){
if(obj[$DOMEventAttrs_IE[i]]===undefined){return false}
}
return true
}
var $NodeTypes={1:"ELEMENT",
2:"ATTRIBUTE",
3:"TEXT",
4:"CDATA_SECTION",
5:"ENTITY_REFERENCE",
6:"ENTITY",
7:"PROCESSING_INSTRUCTION",
8:"COMMENT",
9:"DOCUMENT",
10:"DOCUMENT_TYPE",
11:"DOCUMENT_FRAGMENT",
12:"NOTATION"
}
var $DOMEventDict={__class__:__BRYTHON__.$type,
__name__:'DOMEvent'
}
$DOMEventDict.__mro__=[$DOMEventDict,$ObjectDict]
$DOMEventDict.__getattribute__=function(self,attr){
if(attr=="x"){return $mouseCoords(self).x}
if(attr=="y"){return $mouseCoords(self).y}
if(attr=="data"){
if(self.dataTransfer!==undefined){return $Clipboard(self.dataTransfer)}
else{return self['data']}
}
if(attr=="target"){
if(self.target===undefined){return $DOMNode(self.srcElement)}
else{return $DOMNode(self.target)}
}
if(attr=="char"){return String.fromCharCode(self.which)}
var res=self[attr]
if(res!==undefined){
if(typeof res=='function'){return function(){return res.apply(self,arguments)}}
return $B.$JS2Py(res)
}else{
throw __builtins__.AttributeError("object DOMEvent has no attribute '"+attr+"'")
}
}
var $DOMEvent=__BRYTHON__.$DOMEvent=function(ev){
ev.__class__=$DOMEventDict
if(ev.preventDefault===undefined){ev.preventDefault=function(){ev.returnValue=false}}
if(ev.stopPropagation===undefined){ev.stopPropagation=function(){ev.cancelBubble=true}}
ev.__repr__=function(){return '<DOMEvent object>'}
ev.__str__=function(){return '<DOMEvent object>'}
ev.toString=ev.__str__
return ev
}
$DOMEvent.__class__=__BRYTHON__.$factory
$DOMEvent.$dict=$DOMEventDict
var $ClipboardDict={
__class__:__BRYTHON__.$type,
__name__:'Clipboard'
}
$ClipboardDict.__getitem__=function(self,name){
return self.data.getData(name)
}
$ClipboardDict.__mro__=[$ClipboardDict,$ObjectDict]
$ClipboardDict.__setitem__=function(self,name,value){
self.data.setData(name,value)
}
function $Clipboard(data){
return{
data : data,
__class__ : $ClipboardDict,
}
}
function $EventsList(elt,evt,arg){
this.elt=elt
this.evt=evt
if(isintance(arg,list)){this.callbacks=arg}
else{this.callbacks=[arg]}
this.remove=function(callback){
var found=false
for(var i=0;i<this.callbacks.length;i++){
if(this.callbacks[i]===callback){
found=true
this.callback.splice(i,1)
this.elt.removeEventListener(this.evt,callback,false)
break
}
}
if(!found){throw KeyError("not found")}
}
}
function $OpenFile(file,mode,encoding){
this.reader=new FileReader()
if(mode==='r'){this.reader.readAsText(file,encoding)}
else if(mode==='rb'){this.reader.readAsBinaryString(file)}
this.file=file
this.__class__=dom.FileReader
this.__getattr__=function(attr){
if(this['get_'+attr]!==undefined){return this['get_'+attr]}
return this.reader[attr]
}
this.__setattr__=(function(obj){
return function(attr,value){
if(attr.substr(0,2)=='on'){
if(window.addEventListener){
var callback=function(ev){return value($DOMEvent(ev))}
obj.addEventListener(attr.substr(2),callback)
}else if(window.attachEvent){
var callback=function(ev){return value($DOMEvent(window.event))}
obj.attachEvent(attr,callback)
}
}else if('set_'+attr in obj){return obj['set_'+attr](value)}
else if(attr in obj){obj[attr]=value}
else{setattr(obj,attr,value)}
}
})(this.reader)
}
var dom={File : function(){},
FileReader : function(){}
}
dom.File.__class__=__BRYTHON__.$type
dom.File.__str__=function(){return "<class 'File'>"}
dom.FileReader.__class__=__BRYTHON__.$type
dom.FileReader.__str__=function(){return "<class 'FileReader'>"}
function $Options(parent){
return{
__class__:$OptionsDict,
parent:parent
}
}
var $OptionsDict={
__class__:__BRYTHON__.$type,
__name__:'Options'
}
$OptionsDict.__delitem__=function(self,arg){
self.parent.options.remove(arg.elt)
}
$OptionsDict.__getitem__=function(self,key){
return $DOMNode(self.parent.options[key])
}
$OptionsDict.__len__=function(self){return self.parent.options.length}
$OptionsDict.__mro__=[$OptionsDict,$ObjectDict]
$OptionsDict.__setattr__=function(self,attr,value){
self.parent.options[attr]=value
}
$OptionsDict.__setitem__=function(self,attr,value){
self.parent.options[attr]=__BRYTHON__.$JS2Py(value)
}
$OptionsDict.__str__=function(self){
return "<object Options wraps "+self.parent.options+">"
}
$OptionsDict.append=function(self,element){
self.parent.options.add(element.elt)
}
$OptionsDict.insert=function(self,index,element){
if(index===undefined){self.parent.options.add(element.elt)}
else{self.parent.options.add(element.elt,index)}
}
$OptionsDict.item=function(self,index){
return self.parent.options.item(index)
}
$OptionsDict.namedItem=function(self,name){
return self.parent.options.namedItem(name)
}
$OptionsDict.remove=function(self,arg){self.parent.options.remove(arg.elt)}
var $StyleDict={__class__:__BRYTHON__.$type,__name__:'CSSProperty'}
$StyleDict.__mro__=[$StyleDict,$ObjectDict]
$StyleDict.__getattr__=function(self,attr){
return $ObjectDict.__getattribute__(self.js,attr)
}
$StyleDict.__setattr__=function(self,attr,value){
if(attr.toLowerCase()==='float'){
self.js.cssFloat=value
self.js.styleFloat=value
}else{
if(['top','left','height','width','borderWidth'].indexOf(attr)>-1
&& isinstance(value,__builtins__.int)){value=value+'px'}
self.js[attr]=value
}
}
function $Style(style){
return{__class__:$StyleDict,js:style}
}
$Style.__class__=__BRYTHON__.$factory
$Style.$dict=$StyleDict
$StyleDict.$factory=$Style
function DOMNode(){}
DOMNode.__class__=__BRYTHON__.$type
DOMNode.__mro__=[DOMNode,__builtins__.object.$dict]
DOMNode.__name__='DOMNode'
DOMNode.$dict=DOMNode 
DOMNode.$factory=DOMNode
function $DOMNode(elt){
var res={}
res.$dict={}
res.elt=elt 
if(elt['$brython_id']===undefined||elt.nodeType===9){
elt.$brython_id=Math.random().toString(36).substr(2, 8)
res.__repr__=res.__str__=res.toString=function(){
var res="<DOMNode object type '"
return res+$NodeTypes[elt.nodeType]+"' name '"+elt.nodeName+"'>"
}
}
res.__class__=DOMNode
return res
}
DOMNode.__add__=function(self,other){
var res=$TagSum()
res.children=[self]
if(isinstance(other,$TagSum)){
for(var $i=0;$i<other.children.length;$i++){res.children.push(other.children[$i])}
}else if(isinstance(other,[__builtins__.str,
__builtins__.int,__builtins__.float,__builtins__.list,
__builtins__.dict,__builtins__.set,__builtins__.tuple])){
res.children.push($DOMNode(document.createTextNode(__builtins__.str(other))))
}else{res.children.push(other)}
return res
}
DOMNode.__bool__=function(self){return true}
DOMNode.__class__=__BRYTHON__.$type
DOMNode.__contains__=function(self,key){
try{self.__getitem__(key);return True}
catch(err){return False}
}
DOMNode.__del__=function(self){
if(!self.elt.parentNode){
throw __builtins__.ValueError("can't delete "+str(elt))
}
self.elt.parentNode.removeChild(self.elt)
}
DOMNode.__delitem__=function(self,key){
if(self.elt.nodeType===9){
var res=self.elt.getElementById(key)
if(res){res.parentNode.removeChild(res)}
else{throw KeyError(key)}
}else{
self.elt.removeChild(self.elt.childNodes[key])
}
}
DOMNode.__eq__=function(self,other){
return self.elt==other.elt
}
DOMNode.__getattribute__=function(self,attr){
if(['children','html','id','left','parent','query','text',
'top','value','height','width'].indexOf(attr)>-1){
return DOMNode[attr](self)
}
if(attr=='remove'){
return function(){DOMNode[attr](self,arguments[0])}
}
if(attr=='headers' && self.elt.nodeType==9){
var req=new XMLHttpRequest()
req.open('GET', document.location, false)
req.send(null)
var headers=req.getAllResponseHeaders()
headers=headers.split('\r\n')
var res=__BRYTHON__.builtins.dict()
for(var i=0;i<headers.length;i++){
var header=headers[i]
if(header.strip().length==0){continue}
var pos=header.search(':')
res.__setitem__(header.substr(0,pos),header.substr(pos+1).lstrip())
}
return res
}
if(attr=='$$location'){attr='location'}
if(self.elt.getAttribute!==undefined){
res=self.elt.getAttribute(attr)
if(res!==undefined&&res!==null&&self.elt[attr]===undefined){
return res
}
}
if(self.elt[attr]!==undefined){
res=self.elt[attr]
if(typeof res==="function"){
var func=(function(f,elt){
return function(){
var args=[]
for(var i=0;i<arguments.length;i++){
if(isinstance(arguments[i],JSObject)){
args.push(arguments[i].js)
}else if(isinstance(arguments[i],DOMNode)){
args.push(arguments[i].elt)
}else if(arguments[i]===None){
args.push(null)
}else{
args.push(arguments[i])
}
}
return __BRYTHON__.$JS2Py(f.apply(elt,args))
}
})(res,self.elt)
func.__name__=attr
return func
}else if(attr=='options'){
return $Options(self.elt)
}else if(attr=='style'){
return $Style(self.elt[attr])
}else{
return __BRYTHON__.$JS2Py(self.elt[attr])
}
}
return $ObjectDict.__getattribute__(self,attr)
}
DOMNode.__getitem__=function(self,key){
if(self.elt.nodeType===9){
if(typeof key==="string"){
var res=self.elt.getElementById(key)
if(res){return $DOMNode(res)}
else{throw KeyError(key)}
}else{
try{
var elts=self.elt.getElementsByTagName(key.name),res=[]
for(var $i=0;$i<elts.length;$i++){res.push($DOMNode(elts[$i]))}
return res
}catch(err){
throw KeyError(str(key))
}
}
}else{
return $DOMNode(self.elt.childNodes[key])
}
}
DOMNode.__iter__=function(self){
self.$counter=-1
return self
}
DOMNode.__le__=function(self,other){
var elt=self.elt
if(self.elt.nodeType===9){elt=self.elt.body}
if(isinstance(other,$TagSum)){
var $i=0
for($i=0;$i<other.children.length;$i++){
elt.appendChild(other.children[$i].elt)
}
}else if(typeof other==="string" || typeof other==="number"){
var $txt=document.createTextNode(other.toString())
elt.appendChild($txt)
}else{
elt.appendChild(other.elt)
}
}
DOMNode.__len__=function(self){return self.elt.childNodes.length}
DOMNode.__mul__=function(self,other){
if(isinstance(other,__builtins__.int)&& other.valueOf()>0){
var res=$TagSum()
for(var i=0;i<other.valueOf();i++){
var clone=DOMNode.clone(self)()
res.children.push(clone)
}
return res
}else{
throw __builtins__.ValueError("can't multiply "+self.__class__+"by "+other)
}
}
DOMNode.__ne__=function(self,other){return !DOMNode.__eq__(self,other)}
DOMNode.__next__=function(self){
self.$counter++
if(self.$counter<self.elt.childNodes.length){
return $DOMNode(self.elt.childNodes[self.$counter])
}
throw __builtins__.StopIteration('StopIteration')
}
DOMNode.__radd__=function(self,other){
var res=$TagSum()
var txt=$DOMNode(document.createTextNode(other))
res.children=[txt,self]
return res
}
DOMNode.__repr__=function(self){
if(self===undefined){return "<class 'DOMNode'>"}
else{
var res="<DOMNode object type '"
return res+$NodeTypes[self.elt.nodeType]+"' name '"+self.elt.nodeName+"'>"
}
}
DOMNode.__setattr__=function(self,attr,value){
if(attr.substr(0,2)=='on'){
if(!bool(value)){
DOMNode.unbind(self,attr.substr(2))
}else{
DOMNode.bind(self,attr.substr(2),value)
}
}else{
var attr1=attr.replace('_','-').toLowerCase()
if(DOMNode['set_'+attr1]!==undefined){
return DOMNode['set_'+attr1](self,value)
}
if(self.elt[attr1]!==undefined){self.elt[attr1]=value;return}
var res=self.elt.getAttribute(attr1)
if(res!==undefined&&res!==null){self.elt.setAttribute(attr1,value)}
else{
self.elt[attr]=value
}
}
}
DOMNode.__setitem__=function(self,key,value){
self.elt.childNodes[key]=value
}
DOMNode.__str__=DOMNode.__repr__
DOMNode.bind=function(self,event){
var _id
if(self.elt.nodeType===9){_id=0}
else{_id=self.elt.$brython_id}
var ix=__BRYTHON__.events.$keys.indexOf(_id)
if(ix===-1){
__BRYTHON__.events.$keys.push(_id)
__BRYTHON__.events.$values.push(dict())
ix=__BRYTHON__.events.$keys.length-1
}
var ix_event=__BRYTHON__.events.$values[ix].$keys.indexOf(event)
if(ix_event==-1){
__BRYTHON__.events.$values[ix].$keys.push(event)
__BRYTHON__.events.$values[ix].$values.push([])
ix_event=__BRYTHON__.events.$values[ix].$values.length-1
}
for(var i=2;i<arguments.length;i++){
var func=arguments[i]
var callback=(function(f){
return function(ev){return f($DOMEvent(ev))}}
)(func)
if(window.addEventListener){
self.elt.addEventListener(event,callback,false)
}else if(window.attachEvent){
self.elt.attachEvent("on"+event,callback)
}
__BRYTHON__.events.$values[ix].$values[ix_event].push([func,callback])
}
}
DOMNode.children=function(self){
var res=[]
for(var i=0;i<self.elt.childNodes.length;i++){
res.push($DOMNode(self.elt.childNodes[i]))
}
return res
}
DOMNode.clear=function(self){
for(var i=self.elt.childNodes.length-1;i>=0;i--){
self.elt.removeChild(self.elt.childNodes[i])
}
}
DOMNode.class=function(self){
if(self.elt.className !==undefined){return self.elt.className}
else{return None}
}
DOMNode.clone=function(self){
res=$DOMNode(self.elt.cloneNode(true))
res.elt.$brython_id=Math.random().toString(36).substr(2, 8)
var ix_elt=__BRYTHON__.events.$keys.indexOf(self.elt.$brython_id)
if(ix_elt!=-1){
var events=__BRYTHON__.events.$values[ix_elt]
for(var i=0;i<events.$keys.length;i++){
var event=events.$keys[i]
for(var j=0;j<events.$values[i].length;j++){
DOMNode.bind(res,event,events.$values[i][j][0])
}
}
}
return res
}
DOMNode.focus=function(self){
return(function(obj){
return function(){
setTimeout(function(){obj.focus();}, 10)
}
})(self.elt)
}
DOMNode.get=function(self){
var obj=self.elt
var args=[]
for(var i=1;i<arguments.length;i++){args.push(arguments[i])}
var $ns=__BRYTHON__.$MakeArgs('get',args,[],[],null,'kw')
var $dict={}
for(var i=0;i<$ns['kw'].$keys.length;i++){
$dict[$ns['kw'].$keys[i]]=$ns['kw'].$values[i]
}
if($dict['name']!==undefined){
if(obj.getElementsByName===undefined){
throw __builtins__.TypeError("DOMNode object doesn't support selection by name")
}
var res=[]
var node_list=document.getElementsByName($dict['name'])
if(node_list.length===0){return[]}
for(var i=0;i<node_list.length;i++){
res.push($DOMNode(node_list[i]))
}
}
if($dict['tag']!==undefined){
if(obj.getElementsByTagName===undefined){
throw __builtins__.TypeError("DOMNode object doesn't support selection by tag name")
}
var res=[]
var node_list=document.getElementsByTagName($dict['tag'])
if(node_list.length===0){return[]}
for(var i=0;i<node_list.length;i++){
res.push($DOMNode(node_list[i]))
}
}
if($dict['classname']!==undefined){
if(obj.getElementsByClassName===undefined){
throw __builtins__.TypeError("DOMNode object doesn't support selection by class name")
}
var res=[]
var node_list=document.getElementsByClassName($dict['classname'])
if(node_list.length===0){return[]}
for(var i=0;i<node_list.length;i++){
res.push($DOMNode(node_list[i]))
}
}
if($dict['id']!==undefined){
if(obj.getElementById===undefined){
throw __builtins__.TypeError("DOMNode object doesn't support selection by id")
}
var id_res=obj.getElementById($dict['id'])
if(!id_res){return[]}
else{return[$DOMNode(id_res)]}
}
if($dict['selector']!==undefined){
if(obj.querySelectorAll===undefined){
throw __builtins__.TypeError("DOMNode object doesn't support selection by selector")
}
var node_list=obj.querySelectorAll($dict['selector'])
var sel_res=[]
if(node_list.length===0){return[]}
for(var i=0;i<node_list.length;i++){
sel_res.push($DOMNode(node_list[i]))
}
if(res===undefined){return sel_res}
var to_delete=[]
for(var i=0;i<res.length;i++){
var elt=res[i]
flag=false
for(var j=0;j<sel_res.length;j++){
if(elt.__eq__(sel_res[j])){flag=true;break}
}
if(!flag){to_delete.push(i)}
}
for(var i=to_delete.length-1;i>=0;i--){
res.splice(to_delete[i],1)
}
return res
}
return res
}
DOMNode.getContext=function(self){
if(!('getContext' in self.elt)){throw __builtins__.AttributeError(
"object has no attribute 'getContext'")}
var obj=self.elt
return function(ctx){return new $JSObject(obj.getContext(ctx))}
}
DOMNode.getSelectionRange=function(self){
if(self.elt['getSelectionRange']!==undefined){
return self.elt.getSelectionRange.apply(null,arguments)
}
}
DOMNode.height=function(self){
return __builtins__.int($getPosition(self.elt)["height"])
}
DOMNode.left=function(self){
return __builtins__.int($getPosition(self.elt)["left"])
}
DOMNode.id=function(self){
if(self.elt.id !==undefined){return self.elt.id}
else{return None}
}
DOMNode.options=function(self){
return new $OptionsClass(self.elt)
}
DOMNode.parent=function(self){
if(self.elt.parentElement){return $DOMNode(self.elt.parentElement)}
else{return None}
}
DOMNode.remove=function(self,child){
var elt=self.elt,flag=false,ch_elt=child.elt
if(self.elt.nodeType==9){elt=self.elt.body}
while(ch_elt.parentElement){
if(ch_elt.parentElement===elt){
elt.removeChild(ch_elt)
flag=true
break
}else{ch_elt=ch_elt.parentElement}
}
if(!flag){throw __builtins__.ValueError('element '+child+' is not inside '+self)}
}
DOMNode.top=function(self){
return __builtins__.int($getPosition(self.elt)["top"])
}
DOMNode.reset=function(self){
return function(){self.elt.reset()}
}
DOMNode.style=function(self){
self.elt.style.float=self.elt.style.cssFloat || self.style.styleFloat
console.log('get style')
return new $JSObject(self.elt.style)
}
DOMNode.setSelectionRange=function(self){
if(this['setSelectionRange']!==undefined){
return(function(obj){
return function(){
return obj.setSelectionRange.apply(obj,arguments)
}})(this)
}else if(this['createTextRange']!==undefined){
return(function(obj){
return function(start_pos,end_pos){
if(end_pos==undefined){end_pos=start_pos}
var range=obj.createTextRange()
range.collapse(true)
range.moveEnd('character', start_pos)
range.moveStart('character', end_pos)
range.select()
}
})(this)
}
}
DOMNode.submit=function(self){
return function(){self.elt.submit()}
}
DOMNode.text=function(self){
return self.elt.innerText || self.elt.textContent
}
DOMNode.html=function(self){return self.elt.innerHTML}
DOMNode.value=function(self){return self.elt.value}
DOMNode.width=function(self){
return __builtins__.int($getPosition(self.elt)["width"])
}
DOMNode.set_class=function(self,arg){self.elt.setAttribute('class',arg)}
DOMNode.set_html=function(self,value){
self.elt.innerHTML=str(value)
}
DOMNode.set_style=function(self,style){
for(var i=0;i<style.$keys.length;i++){
var key=style.$keys[i],value=style.$values[i]
if(key.toLowerCase()==='float'){
self.elt.style.cssFloat=value
self.elt.style.styleFloat=value
}else{
if(['top','left','height','width','borderWidth'].indexOf(key)>-1
&& isinstance(value,__builtins__.int)){value=value+'px'}
self.elt.style[key]=value
}
}
}
DOMNode.set_text=function(self,value){
self.elt.innerText=str(value)
self.elt.textContent=str(value)
}
DOMNode.set_value=function(self,value){self.elt.value=str(value)}
DOMNode.toString=function(self){
if(self===undefined){return 'DOMNode'}
return self.elt.nodeName
}
DOMNode.unbind=function(self,event){
var _id
if(self.elt.nodeType==9){_id=0}else{_id=self.elt.$brython_id}
var ix_elt=__BRYTHON__.events.$keys.indexOf(_id)
if(ix_elt==-1){
return 
}
var ix_event=__BRYTHON__.events.$values[ix_elt].$keys.indexOf(event)
if(ix_event==-1){return}
var events=__BRYTHON__.events.$values[ix_elt].$values[ix_event]
if(arguments.length===2){
for(var i=0;i<events.length;i++){
var callback=events[i][1]
if(window.removeEventListener){
self.elt.removeEventListener(event,callback,false)
}else if(window.detachEvent){
self.elt.detachEvent(event,callback,false)
}
}
__BRYTHON__.events.$values[ix_elt][ix_event]=[]
return
}
for(var i=1;i<arguments.length;i++){
var func=arguments[i], flag=false
for(var j=0;j<events.length;j++){
if(func===events[j][0]){
var callback=events[event][j][1]
if(window.removeEventListener){
self.elt.removeEventListener(event,callback,false)
}else if(window.detachEvent){
self.elt.detachEvent(event,callback,false)
}
event.splice(j,1)
flag=true
break
}
if(!flag){throw KeyError('missing callback for event '+event)}
__BRYTHON__.events.$values[ix_elt][ix_event]=events
}
}
}
var $QueryDict={__class__:__BRYTHON__.$type,__name__:'query'}
$QueryDict.__contains__=function(self,key){
return self._keys.indexOf(key)>-1
}
$QueryDict.__getitem__=function(self,key){
var result=self._values[key]
if(result===undefined){throw KeyError(key)}
else if(result.length==1){return result[0]}
return result
}
var $QueryDict_iterator=__BRYTHON__.$iterator_class('query string iterator')
$QueryDict.__iter__=function(self){
return __BRYTHON__.$iterator(self._keys,$QueryDict_iterator)
}
$QueryDict.__mro__=[$QueryDict,$ObjectDict]
$QueryDict.getfirst=function(self,key,_default){
var result=self._values[key]
if(result===undefined){
if(_default===undefined){return None}
return _default
}
return result[0]
}
$QueryDict.getlist=function(self,key){
var result=self._values[key]
if(result===undefined){return[]}
return result
}
$QueryDict.getvalue=function(self,key,_default){
try{return self.__getitem__(key)}
catch(err){
__BRYTHON__.$pop_exc()
if(_default===undefined){return None}
else{return _default}
}
}
$QueryDict.keys=function(self){return self._keys}
DOMNode.query=function(self){
var res={__class__:$QueryDict,
_keys :[],
_values :{}
}
var qs=location.search.substr(1).split('&')
for(var i=0;i<qs.length;i++){
var pos=qs[i].search('=')
var elts=[qs[i].substr(0,pos),qs[i].substr(pos+1)]
var key=decodeURIComponent(elts[0])
var value=decodeURIComponent(elts[1])
if(res._keys.indexOf(key)>-1){res._values[key].push(value)}
else{
res._keys.push(key)
res._values[key]=[value]
}
}
return res
}
var $TagSumDict={
__class__ : __BRYTHON__.$type,
__name__:'TagSum'
}
$TagSumDict.appendChild=function(self,child){
self.children.push(child)
}
$TagSumDict.__add__=function(self,other){
if(other.__class__===$TagSumDict){
self.children=self.children.concat(other.children)
}else if(isinstance(other,[str,__builtins__.int,__builtins__.float,
__builtins__.dict,__builtins__.set,__builtins__.list])){
self.children=self.children.concat($DOMNode(document.createTextNode(other)))
}else{self.children.push(other)}
return self
}
$TagSumDict.__mro__=[$TagSumDict,$ObjectDict]
$TagSumDict.__radd__=function(self,other){
var res=$TagSum()
res.children=self.children.concat($DOMNode(document.createTextNode(other)))
return res
}
$TagSumDict.__repr__=function(self){
var res='<object TagSum> '
for(var i=0;i<self.children.length;i++){
res+=self.children[i]
if(self.children[i].toString()=='[object Text]'){res +=' ['+self.children[i].textContent+']\n'}
}
return res
}
$TagSumDict.__str__=$TagSumDict.toString=$TagSumDict.__repr__
$TagSumDict.clone=function(self){
var res=$TagSum(), $i=0
for($i=0;$i<self.children.length;$i++){
res.children.push(self.children[$i].cloneNode(true))
}
return res
}
function $TagSum(){
return{__class__:$TagSumDict,
children:[],
toString:function(){return '(TagSum)'}
}
}
$TagSum.__class__=__BRYTHON__.$factory
$TagSum.$dict=$TagSumDict
__BRYTHON__.$TagSum=$TagSum 
var $toDOM=function(content){
if(isinstance(content,DOMNode)){return content}
if(isinstance(content,str)){
var _dom=document.createElement('div')
_dom.innerHTML=content
return _dom
}
throw Error('Invalid argument' + content)
}
DOMNode.prototype.addClass=function(classname){
var _c=this.__getattr__('class')
if(_c===undefined){
this.__setattr__('class', classname)
}else{
this.__setattr__('class', _c + " " + classname)
}
return this
}
DOMNode.prototype.after=function(content){
var _content=$toDOM(content)
if(this.nextSibling !==null){
this.parentElement.insertBefore(_content, this.nextSibling)
}else{
this.parentElement.appendChild(_content)
}
return this
}
DOMNode.after=function(self,content){
var _con
if(isinstance(content,DOMNode)){
_con=content.elt
}else{
_con=$toDOM(content)
_con=_con.childNodes[0]
}
if(self.elt.nextSibling !==null){
self.elt.parentElement.insertBefore(_con, self.elt.nextSibling)
}else{
self.elt.parentElement.appendChild(_con)
}
return self
}
DOMNode.prototype.append=function(content){
var _content=$toDOM(content)
this.appendChild(_content)
return this
}
DOMNode.append=function(self,content){
if(isinstance(content,DOMNode)){
self.elt.appendChild(content.elt)
}else{
var _content=$toDOM(content)
self.elt.appendChild(_content.childNodes[0])
}
return self
}
DOMNode.prototype.before=function(content){
var _content=$toDOM(content)
this.parentElement.insertBefore(_content, this)
return this
}
DOMNode.before=function(self,content){
var _con
if(isinstance(content,DOMNode)){
_con=content.elt
}else{
_con=$toDOM(content)
_con=_con.childNodes[0]
}
self.elt.parentElement.insertBefore(_con, self.elt)
return self
}
DOMNode.prototype.closest=function(selector){
var traverse=function(node, ancestors){
if(node===_doc)return None
for(var i=0;i<ancestors.length;i++){
if(node===ancestors[i]){
return ancestors[i]
}
}
return traverse(this.parentElement, ancestors)
}
if(isinstance(selector, str)){
var _elements=_doc.get(selector=selector)
return traverse(this, _elements);
}
return traverse(this, selector)
}
DOMNode.prototype.css=function(property,value){
if(value !==undefined){
this.set_style({property:value})
return this 
}
if(isinstance(property, dict)){
this.set_style(property)
return this
}
if(this.style[property]===undefined){return None}
return this.style[property]
}
DOMNode.prototype.empty=function(){
for(var i=0;i <=this.childNodes.length;i++){
this.removeChild(this.childNodes[i])
}
}
DOMNode.prototype.hasClass=function(name){
var _c=this.__getattr__('class')
if(_c===undefined)return False
if(_c.indexOf(name)> -1)return True
return False
}
DOMNode.prototype.prepend=function(content){
var _content=$toDOM(content)
this.insertBefore(_content, this.firstChild)
}
DOMNode.prototype.removeAttr=function(name){
this.__setattr__(name, undefined)
}
DOMNode.prototype.removeClass=function(name){
var _c=this.__getattr__('class')
if(_c===undefined)return
if(_c===name){
this.__setattr__('class', undefined)
return
}
_index=_c.indexOf(name)
if(_index==-1)return
var _class_string=_c
if(_index==0){
_class_string=_c.substring(name.length)
}else if(_index==_c.length - name.length){
_class_string=_c.substring(0, _index)
}else{
_class_string=_c.replace(' '+name+' ', '')
}
this.__setattr('class', _class_string)
}
var win=new $JSObject(window)
win.get_postMessage=function(msg,targetOrigin){
if(isinstance(msg,dict)){
var temp=new Object()
temp.__class__='dict'
for(var i=0;i<msg.__len__();i++){temp[msg.$keys[i]]=msg.$values[i]}
msg=temp
}
return window.postMessage(msg,targetOrigin)
}
$B.DOMNode=DOMNode
$B.$DOMNode=$DOMNode
$B.win=win
})(__BRYTHON__)
