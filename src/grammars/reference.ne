main -> "method" "(" y x ")" {%
    function(data) {
        f: data[0],
        if (f === 'REF') {
            return {
                function: 'REF';
                row: data[3][0].join(''),
                column: data[2][0].join('')
            };
        } else if (f === 'SUM') {
            return {
                function: 'REF';
                startRow: data[3][0].join(''),
                startColumn: data[2][0].join(''),
                endRow: data[3][0].join(''),
                endColumn: data[2][0].join(''),
            };
        }
    }
%}
method -> [A-Z]:+
y -> [A-Z]:+
x -> [0-9]:+