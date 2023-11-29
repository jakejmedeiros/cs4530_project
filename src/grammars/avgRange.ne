main -> "AVG" "(" y1 x1 ".." y2 x2 ")" {%
    function(data) {
        return {
            function: 'AVG',
            startRow: data[3][0].join(''),
            startColumn: data[2][0].join(''),
            endRow: data[6][0].join(''),
            endColumn: data[5][0].join('')
        };
    }
%}
y1 -> [A-Z]:+
x1 -> [0-9]:+
y2 -> [A-Z]:+
x2 -> [0-9]:+