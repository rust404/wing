import React from "react";
import Button from "./button";
import "../../styles/index.scss";

export default {
  title: "Button",
  component: Button,
};

export const TypeButton = () => (
  <>
    <Button>default</Button>
    <Button btnType="primary">primary</Button>
    <Button btnType="danger">danger</Button>
    <Button btnType="link">link</Button>
  </>
);

TypeButton.story = {
  name: "类型",
};

export const SizeButton = () => (
  <>
    <Button size="sm" btnType="danger">
      sm
    </Button>
    <Button btnType="default">default</Button>
    <Button btnType="primary" size="lg">
      lg
    </Button>
  </>
);

SizeButton.story = {
  name: "尺寸",
};

export const DisabledButton = () => (
  <>
    <Button>default</Button>
    <Button disabled>default disabled</Button>
    <Button btnType="primary">primary</Button>
    <Button btnType="primary" disabled>
      primary disabled
    </Button>
    <Button btnType="danger">danger</Button>
    <Button btnType="danger" disabled>
      danger disalbed
    </Button>
    <Button btnType="link">link</Button>
    <Button btnType="link" disabled>
      link disabled
    </Button>
  </>
);

DisabledButton.story = {
  name: "状态",
};
