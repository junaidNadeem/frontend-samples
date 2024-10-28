// This component displays key job requirements, including agreement type, eligible countries, restricted countries, and required skills.
// It leverages Material-UI components to provide an organized view.

import { IJobPostsQuery } from "@backend/gql-client";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isEmpty } from "radash";

import SkeletonTypography from "../Skeletons/SkeletonTypography";

const Requirements = ({
  opportunity,
  loading,
}: {
  opportunity: IJobPostsQuery["jobPosts"]["edges"][number]["node"] | undefined;
  loading: boolean;
}) => {
  const renderRequirementSection = (label: string, items: string[] | undefined) => {
    if (isEmpty(items)) return null;
    return (
      <Stack direction="row" gap={2}>
        <Typography fontWeight="bold" color="text.secondary">
          {label}
        </Typography>
        <Stack direction="row" gap={1}>
          {items?.map((item) => (
            <Chip color="primary" label={item} key={item} />
          ))}
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack p={4} gap={3}>
      <Stack direction="row" gap={2}>
        <Typography fontWeight="bold" color="text.secondary">
          Agreement Type:
        </Typography>
        <Typography>
          <SkeletonTypography loading={loading} text={opportunity?.agreementType ?? ""} />
        </Typography>
      </Stack>

      {renderRequirementSection(
        "Required Countries of Residence",
        opportunity?.permittedCountriesOfResidence
      )}
      {renderRequirementSection(
        "Restricted Countries of Residence",
        opportunity?.restrictedCountriesOfResidence
      )}
      {renderRequirementSection(
        "Skills",
        opportunity?.skillRequirements?.map((skill) => skill.name)
      )}
    </Stack>
  );
};

export { Requirements };
