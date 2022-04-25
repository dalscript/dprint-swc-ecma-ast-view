#!/bin/bash

set -eu

# Analyze
if [[ $* != *--quick* ]]
then
    echo "Setting up swc_ecma_ast... provide --quick to just code generate"
    (cd ../swc/crates/swc_ecma_ast && cargo rustdoc -- --output-format json -Z unstable-options)
    cp ../swc/target/doc/swc_ecma_ast.json swc_ecma_ast.json

    echo "Setting up swc_ecma_parser..."
    # generate these files to make cargo happy
    # mkdir -p swc_ecma_parser/benches/compare && touch swc_ecma_parser/benches/compare/main.rs
    # mkdir -p swc_ecma_parser/benches/lexer && touch swc_ecma_parser/benches/lexer/main.rs
    # mkdir -p swc_ecma_parser/benches/parser && touch swc_ecma_parser/benches/parser/main.rs
    (cd ../swc/crates/swc_ecma_parser && cargo rustdoc -- --output-format json -Z unstable-options)
    cp ../swc/target/doc/swc_ecma_parser.json swc_ecma_parser.json

    echo "Generating code..."
fi

# Generate
deno run -A generation/main.ts
