export const scale_help = () => `

\`scale(value, start1, stop1, start2 = -2, stop2 = 2)\`

Scales linearily the input \`value\`
from the input range between \`start1\` and \`stop1\`
to the output range  \`start2\` and \`stop2\`.

#### Example

    scale(50, 0, 100, 0, 1)

#### Output

<output>{{ scale(50, 0, 100, 0, 1) }}</output>

`;

export const scale = (value, start1, stop1, start2 = -2, stop2 = 2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const round_help = () => `

\`round(value, decimals = 0)\`

Rounds a number \`value\` to optional \`decimals\`.

Example
    
    round(0.1234)
    round(0.1234, 2)

Output
  
<output>{{ round(0.1234) }}
{{ round(0.1234, 2) }}
</output>

`;

export const round = (value, decimals = 0) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

export const trunc_help = () => `

\`trunc(value, count)\`

Truncates a \`value\` to \`count\` characters.

Example
    
    trunc('Hello', 4)
    trunc(Math.PI, 4)

Output
  
<output>{{ trunc('Hello', 4) }}
{{ trunc(Math.PI, 4) }}
</output>

`;

export const trunc = (value, count) => {
  return String(value).slice(0, count);
};

export const random_help = () => `

\`random(from, to, float = false)\`

Generates a random integer number between \`from\` and \`to\`. 
If \`float = true\`, the output value will be floating point number.

Example
    
    random(0, 2)
    random(0, 2, true)

Output

<output>{{ random(0, 2) }}
{{ random(0, 2, true) }}
</output>
`;

export const random = (from, to, float = false) => {
  const r = from + Math.random() * (to - from);
  return float ? r : Math.floor(r, 2);
};

export const range_help = () => `

\`range(from, to, step = 1)\`

Generates an array of integer numbers in between \`from\` and \`to\` with optional \`step\` parameter.

Example

    range(-1, 1, 0.5)

Output

<output>{{ range(-1, 1, 0.5) }}</output>

`;

export const range = (from, to, step = 1) => {
  const length = Math.floor((to - from) / step) + 1;
  return Array.from({ length }).map((_, i) => from + i * step);
};

export const distance_help = () => `

\`distance(x1, y1, x2, y2)\`

Calculates the distance between tow points

Example

    distance(0, 0, 1, 1)

Output

<output>{{ distance(0, 0, 1, 1) }}</output>
`;

export const distance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
