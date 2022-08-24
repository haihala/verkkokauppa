from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from . import Base


class Cat(Base):
    __tablename__ = "cats"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    image = Column(String)

    owner = relationship("User", back_populates="cats")
    owner_id = Column(Integer, ForeignKey("users.id"))


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    image = Column(String)
    price = Column(Float)
    orders = relationship("Order", back_populates="product")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)

    orders = relationship("Order", back_populates="user")
    cats = relationship("Cat", back_populates="owner")


class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    product = relationship("Product", back_populates="orders")

    product_id = Column(Integer, ForeignKey("products.id"))
    amount = Column(Integer)

    user = relationship("User", back_populates="orders")
    user_id = Column(Integer, ForeignKey("users.id"))
