import { Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useConfirmationModal from "hooks/useConfirmationModal";
import { FiTrash } from "react-icons/fi";
import { useDeleteParkingLot } from "../hooks";
import { IParkingLotDetails } from "../interface";

interface Props {
  data: IParkingLotDetails;
}

function ParkingLotDetails({ data }: Props): JSX.Element {
  const [deleteItem] = useDeleteParkingLot();
  const openConfirmation = useConfirmationModal();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-2 p-6 border rounded cursor-pointer">
      <div className="flex justify-end space-x-2">
        <Button
          onClick={() => navigate(`/${data.id}`)}
          size="sm"
          colorScheme="green"
        >
          View
        </Button>
        <Button
          onClick={() =>
            openConfirmation({
              onSubmit: async (close) => {
                await deleteItem(data?.id);
                close();
              },
            })
          }
          size="sm"
          bg="red.500"
          variant="solid"
          color="white"
        >
          <FiTrash />
        </Button>
      </div>
      <Text fontSize="2xl" fontWeight="medium">
        {data?.name}
      </Text>
      <HStack>
        <Text fontSize="sm" fontWeight={500}>
          Width:
        </Text>
        <Text>{data?.width}</Text>
      </HStack>
      <HStack>
        <Text fontSize="sm" fontWeight={500}>
          Height:
        </Text>
        <Text>{data?.height}</Text>
      </HStack>
    </div>
  );
}

export default ParkingLotDetails;
