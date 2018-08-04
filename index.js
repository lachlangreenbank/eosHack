/* docusign.hpp
*  Lachlan Greenbank
*/

var express = require('express')
var cors = require('cors')
var axios = require('axios')
var app = express()
var Eos = require('eosjs')
const shell = require('shelljs');

var eosEndpoint = 'http://127.0.0.1:8888'

app.use(cors())

// chars
var TAB = '\t'
var BREAK = '\r\n'

// -----------------------------

let baseToJson = function (data) {
    data = Buffer.from(data, 'base64')
    data = data.toString('ascii')
    console.log(data)
    return JSON.parse(data)
}

var createCPPfile = function (tableParams) {

return new Promise(function (resolve, reject) {

var contractName = 'docusign'
var tableName = 'profile'
var methodTableName = tableName + '_table'
var methodTableObj = tableName + 's'


var tableRow = []
// ['account', 'dataone', 'datatwo', 'datathree', 'datafour', 'rob']

var tableRowType = []
// ['account_name', 'uint64_t', 'string', 'string', 'string', 'string']

var tableRowTypewVar = []
// ['const account_name', 'uint32_t', 'const string&', 'const string&', 'const string&', 'const string&']


tableRow.unshift('account')

tableRowType.unshift('account_name')

tableRowTypewVar.unshift('const account_name')

for (var v = 0; v < tableParams.types.length; v++) {
  console.log('bang')
  if (tableParams.types[v] == 'int') {
    tableRowType.push('uint64_t')
    tableRowTypewVar.push('uint32_t')
  } else {
    tableRowType.push('string')
    tableRowTypewVar.push('const string&')
  }
  
}
for (var f = 0; f < tableParams.headers.length; f++) {
  console.log('bang')
  tableRow.push(tableParams.headers[f])
}

var args = tableRowType[0] + ' ' + tableRow[0]
for (var i = 1; i < tableRow.length; i++) {
	args = args + ',' + BREAK + TAB + TAB + TAB + tableRowTypewVar[i] + ' ' + tableRow[i]
}

//const account_name account,
//uint64_t dataone,
//const string& datatwo

var params = ''
for (var i = 0; i < tableRow.length; i++) {
	params = params + TAB + TAB + tableRowType[i] + ' ' + tableRow[i] + ';' + BREAK
}

//account_name account;
//uint64_t dataone;
//string datatwo;

var vars = ''
for (var i = 0; i < tableRow.length; i++) {
	vars = vars + '(' + tableRow[i] + ')'
}

//(account)(dataone)(datatwo)

// -----------------------------

var hppFile = '#include <eosiolib/eosio.hpp>' + BREAK +
'#include <eosiolib/print.hpp>' + BREAK + BREAK +

'#include <string>' + BREAK + BREAK +

'using namespace eosio;' + BREAK +
'using std::string;' + BREAK + BREAK +


'class ' + contractName + ' : public contract {' + BREAK +
'public:' + BREAK +
    TAB + 'using contract::contract;' + BREAK + BREAK +

    TAB + contractName + '(' + tableRowType[0] + ' self)' + BREAK +
    TAB + TAB + ': contract(self) {}' + BREAK + BREAK  +

    TAB + '// @abi action' + BREAK +
    TAB + 'void create(' + args + ');' + BREAK + BREAK +

    TAB + '// @abi action' + BREAK +
    TAB + 'void update(' + args + ');' + BREAK + BREAK +

    TAB + '// @abi action' + BREAK +
    TAB + 'void remove(' + tableRowTypewVar[0]+ ' ' + tableRow[0] + ');' + BREAK + BREAK +

    TAB + '// @abi action' + BREAK +
    TAB + 'void by' + tableRow[1] + '(' + tableRowTypewVar[1] + ' ' + tableRow[1] + ');' + BREAK + BREAK +

'private:' + BREAK +
    TAB + '// @abi table ' + tableName + ' i64' + BREAK +
    TAB + 'struct ' + tableName + ' {' + BREAK + params + BREAK +
        
    TAB + TAB + tableRowType[0] + ' primary_key() const { return ' + tableRow[0] + '; }' + BREAK +
        
    TAB + TAB + tableRowType[1] + ' by_' + tableRow[1] + '() const { return ' + tableRow[1] + '; }' + BREAK + BREAK +

    TAB + TAB + 'EOSLIB_SERIALIZE(' +tableName + ', ' + vars + ')' + BREAK +

    TAB + '};' + BREAK + BREAK +

    TAB +'typedef eosio::multi_index< N(' + tableName + '), ' + tableName + ',' + BREAK +

    TAB + TAB + '// N(name of interface)' + BREAK +

    TAB + TAB + 'indexed_by< N(' + tableRow[1] + '),' + BREAK +
            
    TAB + TAB + TAB + 'const_mem_fun<' + tableName + ', ' + tableRowType[1] + ', ' + '&' + tableName + '::by_' + tableRow[1] + '>' + BREAK +	
	    
    TAB + TAB +'> ' +  BREAK +
            
    TAB + '> ' + methodTableName + ';' + BREAK + BREAK +

'};' + BREAK + BREAK +



'EOSIO_ABI(' + contractName + ', (create)(update)(remove)(by' + tableRow[1] + '))'

var fs = require('fs');
fs.writeFile("./docusign.hpp", hppFile, function(err) {
    if(err) {
        reject(err)
    }

    console.log("The file was saved!");
    resolve(true)
}) 

});

}

var createHPPfile = function (tableParams) {

return new Promise(function (resolve, reject) {

var contractName = 'docusign'
var tableName = 'profile'
var methodTableName = tableName + '_table'
var methodTableObj = tableName + 's'


var tableRow = []
// ['account', 'dataone', 'datatwo', 'datathree', 'datafour', 'rob']

var tableRowType = []
// ['account_name', 'uint64_t', 'string', 'string', 'string', 'string']

var tableRowTypewVar = []
// ['const account_name', 'uint32_t', 'const string&', 'const string&', 'const string&', 'const string&']


tableRow.unshift('account')

tableRowType.unshift('account_name')

tableRowTypewVar.unshift('const account_name')

for (var v = 0; v < tableParams.types.length; v++) {
  console.log('bang')
  if (tableParams.types[v] == 'int') {
    tableRowType.push('uint64_t')
    tableRowTypewVar.push('uint32_t')
  } else {
    tableRowType.push('string')
    tableRowTypewVar.push('const string&')
  }
  
}
for (var f = 0; f < tableParams.headers.length; f++) {
  console.log('bang')
  tableRow.push(tableParams.headers[f])
}

var args = tableRowTypewVar[0] + ' ' + tableRow[0]
for (var i = 1; i < tableRow.length; i++) {
	args = args + ',' + BREAK + (TAB + TAB + TAB + tableRowTypewVar[i] + ' ' + tableRow[i])
}

//const account_name account,
//uint32_t dataone,
//const string& datatwo

var params = ''
for (var i = 0; i < tableRow.length; i++) {
	params = params + TAB + TAB + 'p.' + tableRow[i] + ' = ' + tableRow[i] + ';' + BREAK
}




var cppFile = '#include <' + contractName + '.hpp>' + BREAK + BREAK +
    'void ' + contractName + '::create(' + args + ') {' + BREAK + BREAK +

    TAB + 'require_auth(' + tableRow[0] + ');' + BREAK + BREAK +

    TAB + '' + methodTableName + ' ' + methodTableObj + '(_self, _self);' + BREAK + BREAK +

    TAB + 'auto itr = ' + methodTableObj + '.find(' + tableRow[0] + ');' + BREAK + BREAK +

    TAB + 'eosio_assert(itr == ' + methodTableObj + '.end(), "pid already exists");' + BREAK + BREAK +

    TAB + '' + methodTableObj + '.emplace(' + tableRow[0] + ', [&](auto& p) {' + BREAK + params + TAB +  '});' + BREAK +
'}' + BREAK + BREAK +

'void ' + contractName + '::update(' + args + ') {' + BREAK + BREAK +

    TAB + 'require_auth(' + tableRow[0] + ');' + BREAK + BREAK +

    TAB + '' + methodTableName + ' ' + methodTableObj + '(_self, _self);' + BREAK + BREAK +

    TAB + 'auto itr = ' + methodTableObj + '.find(' + tableRow[0] + ');' + BREAK + BREAK +

    TAB + 'eosio_assert(itr != ' + methodTableObj + '.end(), "pid does not exists");' + BREAK + BREAK +

    TAB + '' + methodTableObj + '.modify(itr, ' + tableRow[0] + ', [&](auto& p) {' + BREAK + params + TAB + '});' + BREAK +
'}' + BREAK + BREAK +

'void ' + contractName + '::remove(' + tableRowTypewVar[0] + ' ' + tableRow[0] + ') {' + BREAK + BREAK +

    TAB + 'require_auth(' + tableRow[0] + ');' + BREAK + BREAK +

    TAB + '' + methodTableName + ' ' + methodTableObj + '(_self, _self);' + BREAK + BREAK +

    TAB + 'auto itr = ' + methodTableObj + '.find(' + tableRow[0] + ');' + BREAK + BREAK +

    TAB + 'eosio_assert(itr != ' + methodTableObj + '.end(), "pid already exists");' + BREAK + BREAK +

    TAB + methodTableObj + '.erase(itr);' + BREAK +
'}' + BREAK + BREAK +

'void ' + contractName + '::by' + tableRow[1] + ' (uint32_t ' + tableRow[1] + ') {' + BREAK +
    TAB + methodTableName + ' ' + methodTableObj + '(_self, _self);' + BREAK + BREAK +

    TAB + 'auto ' + tableRow[1] + '_index = ' + methodTableObj + '.get_index<N(' + tableRow[1] + ')>();' + BREAK + BREAK +

    TAB + 'auto itr = ' + tableRow[1] + '_index' + '.lower_bound(' + tableRow[1] + ');' + BREAK + BREAK +

    TAB + 'for(; itr != ' + tableRow[1] + '_index.end() && itr->' + tableRow[1] + ' == ' + tableRow[1] + '; ++itr) {' + BREAK + BREAK +
	TAB + TAB + 'print(itr->' + tableRow[2] + '.c_str(), " is ", itr->' + tableRow[1] + ', " pos");' + BREAK +
  
    TAB + '}' + BREAK +
'}';






var fs = require('fs');
fs.writeFile("./docusign.cpp", cppFile, function(err) {
    if (err) {
        reject(err)
    }

    console.log("The file was saved!");
    resolve(true)
})

});

}

app.get('/createDatabase/:id', function (req, res) {
  let data = baseToJson(req.params.id)
  Promise.all([createCPPfile(data.cols), createHPPfile(data.cols)]).then(function (value) {
    console.log('promise resolvied')

    const shell = require('shelljs');

    const account = data.account
    shell.exec('./compile.sh', function(code, stdout, stderr) {
      console.log('Exit code:', code)
      if (code === 0) {
        shell.exec('./deploy.sh ' + account, function(code, stdout, stderr) {
          console.log('Exit code:', code)
          res.send('done')
        })
      }
    });
  });
})


app.get('/getRows/:id', function (req, res) {
  console.log('getting data for table ' + req.params.id)
  let data = req.params.id
  const shell = require('shelljs');
  shell.exec('cleos get table ' + data + ' ' + data + ' profile', function(code, stdout, stderr) {
    console.log('Exit code:', code)
    res.send(stdout)
  })
})

app.get('/addRow/:id', function (req, res) {
  let data = baseToJson(req.params.id)
  const shell = require('shelljs');
  
  //let account = '"' + data.account + '"'
  //let fargs = Object.values(data.args)
  //args = "'[" + '"john",'
  //for (i = 0; i < fargs.length; i++) {
  //  if (i !== 0) {
  //     args = args + ' "' + fargs[i] + '"'
  //  } else {
  //     args = args + ' ' + fargs[i]
  //  }
  //  
  //  if (i !== fargs.length - 1) {
  //     args = args + ', '
  //  }
  //}
  //args = args + "]'"
  //console.log(account)
  //console.log(args)
  //console.log('./addRow.sh ' + account + ' ' + args)

  shell.exec('./addRow.sh', function(code, stdout, stderr) {
    console.log('Exit code:', code)
    res.send('done')
  })
  //shell.exec('cleos get table ' + data + == ' profile', function(code, stdout, stderr) {
  //  console.log('Exit code:', code)
  //  res.send(stdout)
  //})
})

app.get('/updateRow/:id', function (req, res) {
  let data = baseToJson(req.params.id)
  const shell = require('shelljs');
  // shell.exec("cleos push action james create '["james", 24, "Pepper", 32]' -p james", {silent:false}).stdout;
})


app.listen(3001, '0.0.0.0', () => console.log('Example app listening on port 3002'))

