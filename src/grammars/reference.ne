main -> "REF" "(" y x ")" {%
    function(data) {
        return {
            function: "REF",
            row: data[3][0].join(''),
            column: data[2][0].join('')
        };
    }
%}
y -> [A-Z]:+
x -> [0-9]:+
