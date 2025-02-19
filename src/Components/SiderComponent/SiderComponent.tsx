import React, { useState } from 'react';
import { Avatar, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ProductOutlined, TruckOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const items2 = [
    {
        key: "/",
        icon: <ProductOutlined />,
        label: "Products",
    },
    {
        key: "/orders",
        icon: <TruckOutlined />,
        label: "Orders"
    },
    {
        key: "/customerdetails",
        icon: <UserOutlined />,
        label: "Customer Details"
    },
    // {
    //     key: "/account",
    //     icon: <LockOutlined />,
    //     label: "Account"
    // }
];

const SiderComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);


    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={240} theme='dark' >

            {!collapsed &&
                <><div style={{ display: 'flex', justifyContent: 'center', marginTop: 50, marginBottom: 50 }}>

                    <Avatar src={"https://as1.ftcdn.net/v2/jpg/05/60/26/08/1000_F_560260880_O1V3Qm2cNO5HWjN66mBh2NrlPHNHOUxW.jpg"} alt='avatar image' size={80} />
                </div><Menu mode="inline" defaultSelectedKeys={['/']} theme="dark" >

                        {items2.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.key}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu></>
            }
            {collapsed && <Menu mode="inline" defaultSelectedKeys={['/']} theme="dark" style={{ marginTop: 180 }}>

                {items2.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>}
        </Sider>
    );
};

export default SiderComponent;
