# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: my-project-messages.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x19my-project-messages.proto\"R\n\x13UpdateConfiguration\x12\x1f\n\nupdateType\x18\x01 \x01(\x0e\x32\x0b.UpdateType\x12\x1a\n\x12updateIntervalInMs\x18\x02 \x01(\r\"f\n\x16SetUpdateConfiguration\x12\x31\n\x13updateConfiguration\x18\x01 \x01(\x0b\x32\x14.UpdateConfiguration\x12\x19\n\x11saveConfiguration\x18\x02 \x01(\x08\"\x99\x01\n\x10MyProjectCommand\x12&\n\x0cnoArgCommand\x18\x01 \x01(\x0e\x32\x0e.NoArgCommandsH\x00\x12\x17\n\rshowFileImage\x18\x02 \x01(\tH\x00\x12\x39\n\x16setUpdateConfiguration\x18\x03 \x01(\x0b\x32\x17.SetUpdateConfigurationH\x00\x42\t\n\x07\x63ommand\")\n\x16InvalidCommandResponse\x12\x0f\n\x07message\x18\x01 \x01(\t\"w\n\x12HatDetailsResponse\x12\x15\n\risScreenClear\x18\x01 \x01(\x08\x12\x17\n\x0f\x61\x63tiveFileImage\x18\x02 \x01(\t\x12\x31\n\x13updateConfiguration\x18\x03 \x01(\x0b\x32\x14.UpdateConfiguration\")\n\x0eUpdateResponse\x12\x17\n\x0f\x62oardUptimeInMs\x18\x01 \x01(\r\"\xb8\x01\n\x11MyProjectResponse\x12\x39\n\x16invalidCommandResponse\x18\x01 \x01(\x0b\x32\x17.InvalidCommandResponseH\x00\x12\x31\n\x12hatDetailsResponse\x18\x02 \x01(\x0b\x32\x13.HatDetailsResponseH\x00\x12)\n\x0eupdateResponse\x18\x03 \x01(\x0b\x32\x0f.UpdateResponseH\x00\x42\n\n\x08response*Q\n\nUpdateType\x12\x15\n\x11UpdateType_NotSet\x10\x00\x12\x13\n\x0fUpdateType_None\x10\x01\x12\x17\n\x13UpdateType_Interval\x10\x02*K\n\rNoArgCommands\x12\x0e\n\nNac_NotSet\x10\x00\x12\x13\n\x0fNac_ClearScreen\x10\x01\x12\x15\n\x11Nac_GetHatDetails\x10\x02\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'my_project_messages_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_UPDATETYPE']._serialized_start=767
  _globals['_UPDATETYPE']._serialized_end=848
  _globals['_NOARGCOMMANDS']._serialized_start=850
  _globals['_NOARGCOMMANDS']._serialized_end=925
  _globals['_UPDATECONFIGURATION']._serialized_start=29
  _globals['_UPDATECONFIGURATION']._serialized_end=111
  _globals['_SETUPDATECONFIGURATION']._serialized_start=113
  _globals['_SETUPDATECONFIGURATION']._serialized_end=215
  _globals['_MYPROJECTCOMMAND']._serialized_start=218
  _globals['_MYPROJECTCOMMAND']._serialized_end=371
  _globals['_INVALIDCOMMANDRESPONSE']._serialized_start=373
  _globals['_INVALIDCOMMANDRESPONSE']._serialized_end=414
  _globals['_HATDETAILSRESPONSE']._serialized_start=416
  _globals['_HATDETAILSRESPONSE']._serialized_end=535
  _globals['_UPDATERESPONSE']._serialized_start=537
  _globals['_UPDATERESPONSE']._serialized_end=578
  _globals['_MYPROJECTRESPONSE']._serialized_start=581
  _globals['_MYPROJECTRESPONSE']._serialized_end=765
# @@protoc_insertion_point(module_scope)
