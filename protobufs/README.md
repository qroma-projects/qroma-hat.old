# Protocol Buffers for Embedded Device IO

## Getting Started

Qroma [uses Docker](https://www.docker.com/get-started/) for its Protocol Buffer build chain, so you will need to have it installed. See https://github.com/qromatech/docker-qromatech.

Once you have docker on your system and available on the command line, start defining your commands in `$PROJECT_ROOT/protobufs/protofiles-in`.

Run the `qroma pb build` command in your `$PROJECT_ROOT` directory. The command will use docker to take the contents of the `protofiles-in` directory and create the definition code for the default qroma languages in the `profofiles-out` directory.

## Rationale

Software developers spend a lot of time on getting computer languages and the programs build on them to have shared data types at the wire level. Protocol buffers are Google's solution to having one set of types that can be serialized and deserialized across multiple platforms. Protocol buffers are the default data-sharing mechanism for Qroma projects due to their power, flexibility, and support for lots of different development environments and styles.

The languages Qroma compiles out of the box are:
* C/C++
* TypeScript
* Python
* Dart
