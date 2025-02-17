import { Flex } from '@citric/core'
import { LoadingCircular } from '@citric/ui'
import { ErrorFeedback } from '@stack-spot/portal-components/error'

interface Props {
  /**
   * Whether or not to show the loading feedback.
   */
  loading: boolean,
  /**
   * A javascript error. Used to show error feedbacks.
   */
  error?: any,
  /**
   * The content to show if it's not loading or has errors.
   */
  children: React.ReactNode,
}

export const AsyncContent = ({ loading, error, children }: Props) => {
  if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center" flex={1} style={{ padding: '80px' }} data-test-hint="loading">
        <LoadingCircular />
      </Flex>
    )
  }

  if (error) return <ErrorFeedback message={error?.message || `${error}`} />

  return children
}
