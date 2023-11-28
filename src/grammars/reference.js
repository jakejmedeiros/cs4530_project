// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$string$1", "symbols": [{"literal":"R"}, {"literal":"E"}, {"literal":"F"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "main", "symbols": ["main$string$1", {"literal":"("}, "y", "x", {"literal":")"}], "postprocess": 
        function(data) {
            return {
                function: "REF",
                row: data[3][0].join(''),
                column: data[2][0].join('')
            };
        }
        },
    {"name": "y$ebnf$1", "symbols": [/[A-Z]/]},
    {"name": "y$ebnf$1", "symbols": ["y$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "y", "symbols": ["y$ebnf$1"]},
    {"name": "x$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "x$ebnf$1", "symbols": ["x$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "x", "symbols": ["x$ebnf$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
