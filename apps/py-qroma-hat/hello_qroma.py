import asyncio

from py_qroma.qroma_comm.qcio_serial_b64 import QcioSerial
from settings import QROMA_ACTIVE_COM_PORT

from qroma_proto import my_project_messages_pb2
from py_qroma.qroma_comm_proto.qroma_comm_pb2 import QromaCommResponse


def create_hello_qroma_message(name):
    hello_qroma_message = my_project_messages_pb2.HelloQromaRequest()
    hello_qroma_message.name = name

    my_project_command = my_project_messages_pb2.MyProjectCommand()
    my_project_command.helloQromaRequest.CopyFrom(hello_qroma_message)

    msg_bytes = my_project_command.SerializeToString()
    return msg_bytes


async def monitor(com_port: str):
    print("STARTING QROMA MONITOR")

    qcio = QcioSerial(com_port)
    asyncio.create_task(qcio.run())

    await qcio.is_ready()

    print("MONITOR READY")
    i = 0
    while i < 10:
        if i % 2 == 0:
            msg_bytes = create_hello_qroma_message(f"Dev World: {i}")
            await qcio.send_app_command_bytes(msg_bytes)

        qhr = QromaCommResponse()
        qc_response = await qcio.read_until_base64_newline_pb_parsed(qhr, 1.5)

        if qc_response:
            my_project_app_bytes = qc_response.appResponseBytes
            my_project_response = my_project_messages_pb2.MyProjectResponse()
            my_project_response.ParseFromString(my_project_app_bytes)

            print("MESSAGE RECEIVED")
            print(my_project_response)
        else:
            print("TIMED OUT")

        i += 1

    print("STOPPING MONITOR")
    qcio.stop()

    print("DONE")


if __name__ == "__main__":
    asyncio.run(monitor(QROMA_ACTIVE_COM_PORT))