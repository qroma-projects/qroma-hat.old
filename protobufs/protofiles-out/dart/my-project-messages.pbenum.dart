//
//  Generated code. Do not modify.
//  source: my-project-messages.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

class UpdateType extends $pb.ProtobufEnum {
  static const UpdateType UpdateType_NotSet = UpdateType._(0, _omitEnumNames ? '' : 'UpdateType_NotSet');
  static const UpdateType UpdateType_None = UpdateType._(1, _omitEnumNames ? '' : 'UpdateType_None');
  static const UpdateType UpdateType_Interval = UpdateType._(2, _omitEnumNames ? '' : 'UpdateType_Interval');

  static const $core.List<UpdateType> values = <UpdateType> [
    UpdateType_NotSet,
    UpdateType_None,
    UpdateType_Interval,
  ];

  static final $core.Map<$core.int, UpdateType> _byValue = $pb.ProtobufEnum.initByValue(values);
  static UpdateType? valueOf($core.int value) => _byValue[value];

  const UpdateType._($core.int v, $core.String n) : super(v, n);
}

class NoArgCommands extends $pb.ProtobufEnum {
  static const NoArgCommands Nac_NotSet = NoArgCommands._(0, _omitEnumNames ? '' : 'Nac_NotSet');
  static const NoArgCommands Nac_ClearScreenToWhite = NoArgCommands._(1, _omitEnumNames ? '' : 'Nac_ClearScreenToWhite');
  static const NoArgCommands Nac_ClearScreenToBlack = NoArgCommands._(2, _omitEnumNames ? '' : 'Nac_ClearScreenToBlack');
  static const NoArgCommands Nac_GetHatDetails = NoArgCommands._(3, _omitEnumNames ? '' : 'Nac_GetHatDetails');
  static const NoArgCommands Nac_RestartDevice = NoArgCommands._(4, _omitEnumNames ? '' : 'Nac_RestartDevice');

  static const $core.List<NoArgCommands> values = <NoArgCommands> [
    Nac_NotSet,
    Nac_ClearScreenToWhite,
    Nac_ClearScreenToBlack,
    Nac_GetHatDetails,
    Nac_RestartDevice,
  ];

  static final $core.Map<$core.int, NoArgCommands> _byValue = $pb.ProtobufEnum.initByValue(values);
  static NoArgCommands? valueOf($core.int value) => _byValue[value];

  const NoArgCommands._($core.int v, $core.String n) : super(v, n);
}


const _omitEnumNames = $core.bool.fromEnvironment('protobuf.omit_enum_names');
