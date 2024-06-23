// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DEX {
    struct Order {
        uint256 id;
        address trader;
        address token;
        uint256 amount;
        uint256 price;
        bool isBuyOrder;
    }

    uint256 public nextOrderId;
    mapping(uint256 => Order) public orders;
    mapping(address => mapping(address => uint256)) public deposits;

    event Deposit(address indexed token, address indexed user, uint256 amount);
    event NewOrder(
        uint256 indexed orderId,
        address indexed trader,
        address indexed token,
        uint256 amount,
        uint256 price,
        bool isBuyOrder
    );
    event OrderMatched(
        uint256 indexed buyOrderId,
        uint256 indexed sellOrderId,
        address indexed trader,
        address token,
        uint256 amount,
        uint256 price
    );

    function depositFunds(uint _fund) external payable {
        require(msg.value == _fund, "Sent ETH amount Error");

        deposits[address(0)][msg.sender] += msg.value;
        emit Deposit(address(0), msg.sender, msg.value);
    }

    function depositTokens(address token, uint256 amount) external {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Deposit amount must be greater than zero");

        IERC20(token).transferFrom(msg.sender, address(this), amount);

        deposits[token][msg.sender] += amount;
        emit Deposit(token, msg.sender, amount);
    }

    function createOrder(
        address token,
        uint256 amount,
        uint256 price,
        bool isBuyOrder
    ) external {
        require(amount > 0 && price > 0, "Invalid amount or price");
        if (isBuyOrder) {
            require(
                deposits[address(0)][msg.sender] >= amount * price,
                "Insufficient ETH balance"
            );
        } else {
            require(
                deposits[token][msg.sender] >= amount,
                "Insufficient token balance"
            );
        }

        orders[nextOrderId] = Order(
            nextOrderId,
            msg.sender,
            token,
            amount,
            price,
            isBuyOrder
        );
        emit NewOrder(
            nextOrderId,
            msg.sender,
            token,
            amount,
            price,
            isBuyOrder
        );
        nextOrderId++;
    }

    function matchOrders(uint256 buyOrderId, uint256 sellOrderId) external {
        Order storage buyOrder = orders[buyOrderId];
        Order storage sellOrder = orders[sellOrderId];

        require(buyOrder.isBuyOrder && !sellOrder.isBuyOrder, "Invalid orders");
        require(buyOrder.price >= sellOrder.price, "Price mismatch");
        require(buyOrder.amount == sellOrder.amount, "Amount mismatch");

        uint256 amount = buyOrder.amount;
        uint256 price = sellOrder.price;

        if (buyOrder.token == address(0)) {
            deposits[address(0)][buyOrder.trader] -= amount * (price);
            deposits[address(this)][buyOrder.trader] += amount;
            deposits[address(this)][sellOrder.trader] -= amount;
            deposits[address(0)][sellOrder.trader] += amount * (price);
        } else {
            require(
                deposits[buyOrder.token][sellOrder.trader] >= amount,
                "Seller has insufficient token balance"
            );

            deposits[buyOrder.token][buyOrder.trader] += amount;
            deposits[buyOrder.token][sellOrder.trader] -= amount;

            deposits[address(0)][buyOrder.trader] -= amount * (price);
            deposits[address(0)][sellOrder.trader] += amount * (price);
        }

        emit OrderMatched(
            buyOrderId,
            sellOrderId,
            msg.sender,
            buyOrder.token,
            amount,
            price
        );
    }
}
