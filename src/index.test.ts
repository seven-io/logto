import createConnector from '.';
import { mockedConfig } from './mock';

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

describe('Seven SMS connector', () => {
  it('init without throwing errors', async () => {
    await expect(createConnector({ getConfig })).resolves.not.toThrow();
  });
});
