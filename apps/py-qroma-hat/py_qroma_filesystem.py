import asyncio
from py_qroma.qroma_comm.qcio_serial import QcioSerial
from settings import QROMA_ACTIVE_COM_PORT

from py_qroma.qroma_comm_proto import qroma_comm_pb2
from py_qroma.qroma_comm_proto import file_system_commands_pb2

import base64


def create_list_dir_contents_command(dir_path):
    list_dir_contents_command = file_system_commands_pb2.ListDirContentsCommand()
    list_dir_contents_command.dirPath = dir_path

    fs_command = file_system_commands_pb2.FileSystemCommand()
    fs_command.listDirContentsCommand.CopyFrom(list_dir_contents_command)

    qroma_message = qroma_comm_pb2.QromaCommCommand()
    qroma_message.fsCommand.CopyFrom(fs_command)

    msg_bytes = qroma_message.SerializeToString()
    return msg_bytes


async def monitor(com_port: str):
    print("STARTING QROMA MONITOR")

    qcio = QcioSerial(com_port)
    asyncio.create_task(qcio.run())

    await qcio.is_ready()

    print("MONITOR READY")
    i = 0
    while i < 5:
        if i % 2 == 0:
            msg_bytes = create_list_dir_contents_command("/")
            msg_bytes_b64 = base64.b64encode(msg_bytes) + b'\n'
            await qcio.send_bytes(msg_bytes_b64)
            # print("LIST DIR")
            # print(msg_bytes_b64)

        data = await qcio.read_bytes_until_timeout(1.0)
        print(f"LINE RECEIVED: {data}")
        i = i + 1

    print("STOPPING MONITOR")
    qcio.stop()

    print("DONE")


if __name__ == "__main__":
    asyncio.run(monitor(QROMA_ACTIVE_COM_PORT))