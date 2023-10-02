import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getBillingById, updateBillingById } from 'apiSdk/billings';
import { billingValidationSchema } from 'validationSchema/billings';
import { BillingInterface } from 'interfaces/billing';
import { OrderInterface } from 'interfaces/order';
import { getOrders } from 'apiSdk/orders';

function BillingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BillingInterface>(
    () => (id ? `/billings/${id}` : null),
    () => getBillingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BillingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBillingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/billings');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BillingInterface>({
    initialValues: data,
    validationSchema: billingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Billings',
              link: '/billings',
            },
            {
              label: 'Update Billing',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Billing
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.billing_number}
            label={'Billing Number'}
            props={{
              name: 'billing_number',
              placeholder: 'Billing Number',
              value: formik.values?.billing_number,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Total Amount"
            formControlProps={{
              id: 'total_amount',
              isInvalid: !!formik.errors?.total_amount,
            }}
            name="total_amount"
            error={formik.errors?.total_amount}
            value={formik.values?.total_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Gst Amount"
            formControlProps={{
              id: 'gst_amount',
              isInvalid: !!formik.errors?.gst_amount,
            }}
            name="gst_amount"
            error={formik.errors?.gst_amount}
            value={formik.values?.gst_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('gst_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Net Amount"
            formControlProps={{
              id: 'net_amount',
              isInvalid: !!formik.errors?.net_amount,
            }}
            name="net_amount"
            error={formik.errors?.net_amount}
            value={formik.values?.net_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('net_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.payment_method}
            label={'Payment Method'}
            props={{
              name: 'payment_method',
              placeholder: 'Payment Method',
              value: formik.values?.payment_method,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<OrderInterface>
            formik={formik}
            name={'order_id'}
            label={'Select Order'}
            placeholder={'Select Order'}
            fetcher={getOrders}
            labelField={'order_number'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/billings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'billing',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BillingEditPage);
