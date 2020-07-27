import React from "react";
import { config } from "react-transition-group";
import { render, fireEvent, wait, waitFor } from "@testing-library/react";
import Upload from "./upload";
import axios from 'axios'
config.disabled = true;

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('test Upload component',  () => {
  it('should render properly by default', () => {

    const wrapper = render(
      <Upload action="/"/>
    )
    const button = wrapper.queryByText('upload')
    expect(button).toBeInTheDocument()
    const input = wrapper.container.querySelector('input') as HTMLInputElement
    expect(input).not.toBeVisible()
  })
  it('should render properly with custom children', () => {
    const wrapper = render(
      <Upload action="/">
        <div data-testid="custom-child">custom child</div>
      </Upload>
    )
    const child = wrapper.queryByTestId('custom-child')
    expect(child).toBeInTheDocument()
    const button = wrapper.queryByAltText('upload')
    expect(button).not.toBeInTheDocument()
  })
  it('should run onSuccess when success', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: 'test'
    })
    const onSuccess = jest.fn()
    const wrapper = render(
      <Upload action="/" onSuccess={onSuccess}/>
    )
    const input = wrapper.container.querySelector('input') as HTMLInputElement
    const file = new File(['test file'], 'test.txt')
    fireEvent.change(input, {
      target: {
        files: [file]
      }
    })
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(expect.objectContaining({
        name: 'test.txt',
        status: 'success',
        uid: expect.any(String)
      }), 'test')
    })
  })
  it('should run onError when error', async () => {
    const errMsg = {data: 'error'}
    mockedAxios.post.mockRejectedValueOnce(errMsg)
    const onError = jest.fn()
    const wrapper = render(
      <Upload action="/" onError={onError}/>
    )
    const input = wrapper.container.querySelector('input') as HTMLInputElement
    const file = new File(['test file'], 'test.txt')
    fireEvent.change(input, {
      target: {
        files: [file]
      }
    })
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(expect.objectContaining({
        name: 'test.txt',
        status: 'error',
        uid: expect.any(String)
      }), errMsg)
    })
  })
})