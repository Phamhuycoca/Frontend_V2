import { DownOutlined, RedoOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TreeSelect,
  type TableProps,
} from 'antd';
import { useState, type ReactNode } from 'react';
const { Search } = Input;
interface PropTable<T> extends TableProps<T> {
  page: number;
  page_size: number;
  filter?: string;
  sort?: string;
  search?: string;
  total: number;
  isSearch?: Boolean;
  ActionButton?: ReactNode;
  arrFilterForm?: FilterForm[];
  onChangeTable?: (params: {
    page: number;
    pageSize: number;
    sort?: string;
    filters?: Record<string, any>;
    search?: string;
  }) => void;
}

interface FilterForm {
  label: string;
  name: string;
  type: 'text' | 'select' | 'date' | 'checkbox' | 'treeselect';
  data?: { label: string; value: any; children?: any[] }[];
}

export const TableBase = <T extends object>(props: PropTable<T>) => {
  const { page, page_size, columns, dataSource, total, onChangeTable, isSearch, ActionButton, arrFilterForm, ...rest } =
    props;
  const [isShowFilter, setIsShowFilter] = useState<Boolean>(false);
  return (
    <>
      {isSearch && (
        <>
          <Row className="mb-4">
            <Col span={12}>
              <Row align={'middle'}>
                <Col span={16}>
                  <Search
                    placeholder="Nhập từ khóa để tìm kiếm"
                    onSearch={(value) => {
                      onChangeTable?.({ page: page, pageSize: page_size, search: value });
                    }}
                  />
                </Col>
                <Col span={7} className="ms-3">
                  <Button
                    style={{ color: '#4096ff' }}
                    onClick={() => {
                      setIsShowFilter(!isShowFilter);
                    }}
                    type="text"
                    icon={isShowFilter ? <UpOutlined /> : <DownOutlined />}
                    iconPosition="end"
                  >
                    {isShowFilter ? 'Thu gọn' : 'Mở rộng'}
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify={'end'}>
                <Space>{ActionButton}</Space>
              </Row>
            </Col>
          </Row>
          {isShowFilter && (
            <>
              {isShowFilter}
              {arrFilterForm && (
                <>
                  <Form
                    onFinish={(values) => {
                      onChangeTable?.({
                        page,
                        pageSize: page_size,
                        search: props.search,
                        filters: values,
                      });
                    }}
                  >
                    <Form.Item colon={false} label="Tìm kiếm nâng cao"></Form.Item>
                    <Row gutter={16}>
                      {props.arrFilterForm?.map((field, index) => {
                        let inputComponent: React.ReactNode;

                        switch (field.type) {
                          case 'text':
                            inputComponent = <Input placeholder={`Nhập ${field.label}`} />;
                            break;

                          case 'select':
                            inputComponent = <Select options={field.data} placeholder={`Chọn ${field.label}`}></Select>;
                            break;

                          case 'date':
                            inputComponent = <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày" />;
                            break;

                          case 'checkbox':
                            inputComponent = <Checkbox>{field.label}</Checkbox>;
                            break;
                          case 'treeselect':
                            inputComponent = (
                              <TreeSelect
                                treeData={field.data}
                                placeholder={`Chọn ${field.label}`}
                                allowClear
                                style={{ width: '100%' }}
                              />
                            );
                            break;
                          default:
                            inputComponent = null;
                        }

                        return (
                          <Col span={12} key={index}>
                            <Form.Item
                              label={field.type !== 'checkbox' ? field.label : ''}
                              name={field.name}
                              valuePropName={field.type === 'checkbox' ? 'checked' : 'value'}
                            >
                              {inputComponent}
                            </Form.Item>
                          </Col>
                        );
                      })}
                    </Row>
                    <Form.Item>
                      <Row justify={'center'}>
                        <Space>
                          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} iconPosition="start">
                            Tìm kiếm
                          </Button>
                          <Button
                            icon={<RedoOutlined />}
                            iconPosition="start"
                            htmlType="reset"
                            onClick={() => {
                              onChangeTable?.({
                                page,
                                pageSize: page_size,
                                search: props.search,
                                filters: {},
                              });
                            }}
                          >
                            Làm mới
                          </Button>
                        </Space>
                      </Row>
                    </Form.Item>
                  </Form>
                </>
              )}
            </>
          )}
        </>
      )}
      <Table<T>
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: page,
          pageSize: page_size,
          total: total,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
        }}
        rowKey={(record: any) => record.id || JSON.stringify(record)}
        onChange={(pagination, filters, sorter) => {
          let sort: string | undefined = undefined;

          if (!Array.isArray(sorter) && sorter.field && sorter.order) {
            const order = sorter.order === 'ascend' ? 0 : 1;
            sort = `{"${sorter.field}":${order}}`;
          }

          onChangeTable?.({
            page: pagination.current || 1,
            pageSize: pagination.pageSize || 20,
            sort,
            filters,
          });
        }}
        {...rest}
      />
    </>
  );
};
