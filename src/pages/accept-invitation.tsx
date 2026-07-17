import { Form, Formik } from 'formik'
import { useSearchParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { inferMutationInput, trpc } from '~/utils/trpc'
import IVButton from '~/components/IVButton'
import IVSpinner from '~/components/IVSpinner'
import { MeProvider, useMe } from '~/components/MeContext'
import IVAPIError from '~/components/IVAPIError'
import { logout } from '~/utils/auth'

function Container(props) {
  return (
    <div className="flex items-center justify-center min-h-screen-ios">
      <Helmet>
        <title>Join organization | Interval</title>
      </Helmet>
      {props.children}
    </div>
  )
}

function LoadingState(props) {
  return (
    <Container>
      <div className="py-12 text-center">
        {props.children ?? <IVSpinner />}
        {props.children && (
          <IVButton
            href="/"
            theme="secondary"
            label="Go back"
            className="mt-4"
          />
        )}
      </div>
    </Container>
  )
}

function AcceptInvitationPage() {
  return <LoadingState />
}

export default function AcceptInvitationPageWrapper() {
  return (
    <MeProvider>
      <AcceptInvitationPage />
    </MeProvider>
  )
}
