import { useState } from "react";
import { Flex, Select, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilter = () => {
  const [filters] = useState(filterData);

  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const value = getFilterValues(filterValues);
    value.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query });
  };

  return (
    <Flex justifyContent="center" flexWrap="wrap" p="4" bg="gray.100">
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter.items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilter;
