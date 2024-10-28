// This component is a detailed view for displaying job opportunity information to users.
// Including general details, application statistics, dates, earnings, and requirements

import { IJobPostsQuery } from "@backend/gql-client";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SkeletonTypography from "../../Skeletons/SkeletonTypography";
import ApplyToOpportunity from "../ApplyToOpportunity";
import { Requirements } from "../Requirements";
import formatDateLongForm from "../utils/formatDateLongForm";

const Opportunity = ({
  opportunity,
  loading,
}: {
  opportunity: IJobPostsQuery["jobPosts"]["edges"][number]["node"] | undefined;
  loading: boolean;
}) => {
  const totalApplicants =
    (opportunity?.applicationStats?.numberOfInProgressApplications ?? 0) +
    (opportunity?.applicationStats?.numberOfPassedApplications ?? 0) +
    (opportunity?.applicationStats?.numberOfRejectedApplications ?? 0);

  const renderStat = (label: string, value: string | number) => (
    <Grid item xs={12} container spacing={1}>
      <Grid item>
        <Typography fontWeight="bold" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography fontWeight="bold" textTransform="uppercase">
          <SkeletonTypography loading={loading} text={String(value)} />
        </Typography>
      </Grid>
    </Grid>
  );

  const renderDate = (label: string, date: string | undefined) => (
    <Grid item xs={12} container spacing={1}>
      <Grid item>
        <Typography fontWeight="bold" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <SkeletonTypography loading={loading} text={formatDateLongForm(date)} />
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Box sx={{ width: "100%", py: 2, px: 4 }}>
        <Typography variant="subtitle2">Opportunity Detail View</Typography>
        <Grid container spacing={1}>
          <Grid item xs={4} container>
            <Typography variant="h6" fontWeight="bold">
              <SkeletonTypography loading={loading} text={opportunity?.title ?? ""} />
            </Typography>
            {renderStat(
              "Approved / Openings",
              `${opportunity?.applicationStats?.numberOfPassedApplications ?? 0} / ${
                opportunity?.openingsLimit ?? "∞"
              }`
            )}
            {renderStat(
              "Applied / Applicants Limit",
              `${totalApplicants}/${opportunity?.applicationLimit ?? "∞"}`
            )}
          </Grid>

          <Grid item xs={3} container>
            {renderStat("Status", opportunity?.status ?? "")}
            {renderDate("Expected Work Start Date", opportunity?.workStartDate)}
          </Grid>

          <Grid item xs={3} container>
            {renderDate("Sourcing Start Date", opportunity?.startDate)}
            {renderDate("Sourcing End Date", opportunity?.endDate)}
          </Grid>

          <ApplyToOpportunity opportunity={opportunity} />
        </Grid>
      </Box>

      <Divider />

      <Box sx={{ py: 2, px: 4 }}>
        <Stack direction="row" gap={2} pb={2}>
          <Typography fontWeight="bold" color="text.secondary">
            Expected Earnings
          </Typography>
          <Typography>{opportunity?.financialExpectations}</Typography>
        </Stack>

        <Stack direction="row" gap={2}>
          <Typography fontWeight="bold" color="text.secondary">
            Description
          </Typography>
          <Typography>
            <SkeletonTypography loading={loading} text={opportunity?.description ?? ""} />
          </Typography>
        </Stack>
      </Box>

      <Divider />

      <Typography fontWeight="bold" color="text.secondary" pl={4} pt={2}>
        Requirements
      </Typography>
      <Requirements opportunity={opportunity} loading={loading} />
    </>
  );
};

export { Opportunity };
