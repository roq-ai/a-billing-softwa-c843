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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createOrderItem } from 'apiSdk/order-items';
import { orderItemValidationSchema } from 'validationSchema/order-items';
import { OrderInterface } from 'interfaces/order';
import { MenuInterface } from 'interfaces/menu';
import { getOrders } from 'apiSdk/orders';
import { getMenus } from 'apiSdk/menus';
import { OrderItemInterface } from 'interfaces/order-item';

function OrderItemCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrderItemInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrderItem(values);
      resetForm();
      router.push('/order-items');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrderItemInterface>({
    initialValues: {
      quantity: 0,
      price: 0,
      gst_amount: 0,
      net_amount: 0,
      order_id: (router.query.order_id as string) ?? null,
      menu_id: (router.query.menu_id as string) ?? null,
    },
    validationSchema: orderItemValidationSchema,
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
              label: 'Order Items',
              link: '/order-items',
            },
            {
              label: 'Create Order Item',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Order Item
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Quantity"
            formControlProps={{
              id: 'quantity',
              isInvalid: !!formik.errors?.quantity,
            }}
            name="quantity"
            error={formik.errors?.quantity}
            value={formik.values?.quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Price"
            formControlProps={{
              id: 'price',
              isInvalid: !!formik.errors?.price,
            }}
            name="price"
            error={formik.errors?.price}
            value={formik.values?.price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
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

          <AsyncSelect<OrderInterface>
            formik={formik}
            name={'order_id'}
            label={'Select Order'}
            placeholder={'Select Order'}
            fetcher={getOrders}
            labelField={'order_number'}
          />
          <AsyncSelect<MenuInterface>
            formik={formik}
            name={'menu_id'}
            label={'Select Menu'}
            placeholder={'Select Menu'}
            fetcher={getMenus}
            labelField={'name'}
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
              onClick={() => router.push('/order-items')}
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
    entity: 'order_item',
    operation: AccessOperationEnum.CREATE,
  }),
)(OrderItemCreatePage);
