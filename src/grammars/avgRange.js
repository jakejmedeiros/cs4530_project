// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$string$1", "symbols": [{"literal":"A"}, {"literal":"V"}, {"literal":"G"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "main$string$2", "symbols": [{"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "main", "symbols": ["main$string$1", {"literal":"("}, "y1", "x1", "main$string$2", "y2", "x2", {"literal":")"}], "postprocess": 
        function(data) {
            return {
                function: 'AVG',
                startRow: data[3][0].join(''),
                startColumn: data[2][0].join(''),
                endRow: data[6][0].join(''),
                endColumn: data[5][0].join('')
            };
        }
        },
    {"name": "y1$ebnf$1", "symbols": [/[A-Z]/]},
    {"name": "y1$ebnf$1", "symbols": ["y1$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "y1", "symbols": ["y1$ebnf$1"]},
    {"name": "x1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "x1$ebnf$1", "symbols": ["x1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "x1", "symbols": ["x1$ebnf$1"]},
    {"name": "y2$ebnf$1", "symbols": [/[A-Z]/]},
    {"name": "y2$ebnf$1", "symbols": ["y2$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "y2", "symbols": ["y2$ebnf$1"]},
    {"name": "x2$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "x2$ebnf$1", "symbols": ["x2$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "x2", "symbols": ["x2$ebnf$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
